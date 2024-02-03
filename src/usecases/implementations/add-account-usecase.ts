import { AddAccount, AddAccountData } from 'src/domain/protocols/add-account';
import { LoadAccountByEmailRepository } from '../protocols/db/load-account-by-email-repository';
import { Hasher } from '../protocols/cryptography/hasher';
import { AddAccountRepository } from '../protocols/db/add-account-repository';

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
    await this.addAccountRepository.add({ name, email, password: hashedPassword, createdAt: new Date() });
    return '';
  }
}
