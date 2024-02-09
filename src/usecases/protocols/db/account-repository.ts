import { AddAccountRepository } from './add-account-repository';
import { LoadAccountByEmailRepository } from './load-account-by-email-repository';

export interface AccountRepository extends AddAccountRepository, LoadAccountByEmailRepository {}
