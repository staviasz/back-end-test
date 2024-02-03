import { AddAccount, AddAccountData } from 'src/domain/protocols/add-account';
import { LoadAccountByEmailRepository } from '../protocols/db/load-account-by-email-repository';
import { Hasher } from '../protocols/cryptography/hasher';

export class AddAccountUseCase implements AddAccount {
  constructor(
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository,
    private readonly hasher: Hasher,
  ) {}

  async perform(data: AddAccountData): Promise<Error | string> {
    const loadAccountResult = await this.loadAccountByEmailRepository.loadByEmail(data.email);
    if (loadAccountResult) {
      return new Error(`Email '${data.email}' is invalid`);
    }
    await this.hasher.hash(data.password);
    return '';
  }
}
