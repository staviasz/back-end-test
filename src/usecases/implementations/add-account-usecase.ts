import { AddAccount, AddAccountData } from 'src/domain/protocols/add-account';
import { LoadAccountByEmailRepository } from '../protocols/db/load-account-by-email-repository';
import { Hasher } from '../protocols/cryptography/hasher';
import { AddAccountRepository } from '../protocols/db/add-account-repository';
import * as jwt from 'jsonwebtoken';

export class AddAccountUseCase implements AddAccount {
  constructor(
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository,
    private readonly hasher: Hasher,
    private readonly addAccountRepository: AddAccountRepository,
  ) {}

  async perform(data: AddAccountData): Promise<Error | string> {
    const loadAccountResult = await this.loadAccountByEmailRepository.loadByEmail(data.email);
    if (loadAccountResult) {
      return new Error(`Email '${data.email}' is invalid`);
    }
    const hashedPassword = await this.hasher.hash(data.password);
    const { email, name } = data;
    const account = await this.addAccountRepository.add({
      name,
      email,
      password: hashedPassword,
      createdAt: new Date(),
    });
    const token = jwt.sign(account.id, '123nm9dl@l$lsisOpsksm2');
    return token;
  }
}
