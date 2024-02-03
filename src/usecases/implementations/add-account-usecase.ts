import { AddAccount, AddAccountData } from 'src/domain/protocols/add-account';
import { LoadAccountByEmailRepository } from '../protocols/db/load-account-by-email-repository';

export class AddAccountUseCase implements AddAccount {
  constructor(private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository) {}

  async perform(data: AddAccountData): Promise<Error | string> {
    const loadAccountResult = await this.loadAccountByEmailRepository.loadByEmail(data.email);
    if (loadAccountResult) {
      return new Error(`Email '${data.email}' is invalid`);
    }
    return '';
  }
}
