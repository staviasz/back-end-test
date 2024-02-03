import { AccountModel } from 'src/domain/models/account';

export type AddAccountRepositoryData = Omit<AccountModel, 'id'>;

export interface AddAccountRepository {
  add: (data: AddAccountRepositoryData) => Promise<AccountModel>;
}
