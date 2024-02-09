import { AccountModel } from 'src/domain/models/account';
import { AddAccountData } from 'src/domain/protocols/add-account';
import { Hasher } from '../protocols/cryptography/hasher';
import { AccountRepository } from '../protocols/db/account-repository';
import { AddAccountRepository, AddAccountRepositoryData } from '../protocols/db/add-account-repository';
import { LoadAccountByEmailRepository } from '../protocols/db/load-account-by-email-repository';
import { AddAccountUseCase } from './add-account-usecase';

jest.mock('jsonwebtoken', () => ({
  sign(): string {
    return 'any_token';
  },
}));

const makeFakeAddAccountData = (): AddAccountData => ({
  name: 'any_name',
  email: 'any_email@mail.com',
  password: 'any_password',
});

const makeFakeAccountModel = (): AccountModel => ({
  id: 'any_id',
  name: 'any_name',
  email: 'any_email@mail.com',
  password: 'hashed_password',
  createdAt: new Date(),
});

const makeLoadAccountByEmailRepositoryStub = (): LoadAccountByEmailRepository => {
  class LoadAccountByEmailRepositoryStub implements LoadAccountByEmailRepository {
    async loadByEmail(email: string): Promise<null | AccountModel> {
      return await Promise.resolve(null);
    }
  }
  return new LoadAccountByEmailRepositoryStub();
};

const makeHasher = (): Hasher => {
  class HasherStub implements Hasher {
    async hash(value: string): Promise<string> {
      return await Promise.resolve('hashed_password');
    }
  }
  return new HasherStub();
};

const makeAddAccountRepository = (): AddAccountRepository => {
  class AddAccountRepositoryStub implements AddAccountRepository {
    async add(data: AddAccountRepositoryData): Promise<AccountModel> {
      return await Promise.resolve(makeFakeAccountModel());
    }
  }
  return new AddAccountRepositoryStub();
};

const makeAccountRepository = (): AccountRepository => {
  class AccountRepositoryStub implements AccountRepository {
    async add(data: AddAccountRepositoryData): Promise<AccountModel> {
      return await Promise.resolve(makeFakeAccountModel());
    }
    async loadByEmail(email: string): Promise<null | AccountModel> {
      return await Promise.resolve(null);
    }
  }
  return new AccountRepositoryStub();
};

interface SutTypes {
  sut: AddAccountUseCase;
  loadAccountByEmailRepositoryStub: LoadAccountByEmailRepository;
  hasherStub: Hasher;
  addAccountRepositoryStub: AddAccountRepository;
  AccountRepositoryStub: AccountRepository;
}

const makeSut = (): SutTypes => {
  const loadAccountByEmailRepositoryStub = makeLoadAccountByEmailRepositoryStub();
  const hasherStub = makeHasher();
  const addAccountRepositoryStub = makeAddAccountRepository();
  const AccountRepositoryStub = makeAccountRepository();
  const sut = new AddAccountUseCase(hasherStub, AccountRepositoryStub);
  return { sut, loadAccountByEmailRepositoryStub, hasherStub, addAccountRepositoryStub, AccountRepositoryStub };
};

describe('AddAccountUseCase', () => {
  it('Should call LoadAccountByEmailRepository with correct email', async () => {
    const { sut, AccountRepositoryStub } = makeSut();
    const loadByEmailSpy = jest.spyOn(AccountRepositoryStub, 'loadByEmail');
    await sut.perform(makeFakeAddAccountData());
    expect(loadByEmailSpy).toHaveBeenCalledWith('any_email@mail.com');
  });

  it('Should return a Error if LoadAccountByEmailRepository returns an Account', async () => {
    const { sut, AccountRepositoryStub } = makeSut();
    jest.spyOn(AccountRepositoryStub, 'loadByEmail').mockReturnValueOnce(Promise.resolve(makeFakeAccountModel()));
    const result = await sut.perform(makeFakeAddAccountData());
    expect(result).toEqual(new Error(`Email 'any_email@mail.com' is invalid`));
  });

  it('Should throw if LoadAccountByEmailRepository throws', async () => {
    const { sut, AccountRepositoryStub } = makeSut();
    jest.spyOn(AccountRepositoryStub, 'loadByEmail').mockReturnValueOnce(Promise.reject(new Error('any_message')));
    const promise = sut.perform(makeFakeAddAccountData());
    await expect(promise).rejects.toThrow(new Error('any_message'));
  });

  it('Should call Hasher with correct password', async () => {
    const { sut, hasherStub } = makeSut();
    const hashSpy = jest.spyOn(hasherStub, 'hash');
    await sut.perform(makeFakeAddAccountData());
    expect(hashSpy).toHaveBeenCalledWith('any_password');
  });

  it('Should throw if Hasher throws', async () => {
    const { sut, hasherStub } = makeSut();
    jest.spyOn(hasherStub, 'hash').mockReturnValueOnce(Promise.reject(new Error('any_message')));
    const promise = sut.perform(makeFakeAddAccountData());
    await expect(promise).rejects.toThrow(new Error('any_message'));
  });

  it('Should call AddAccountRepository with correct values', async () => {
    const { sut, AccountRepositoryStub } = makeSut();
    const addAccountRepositorySpy = jest.spyOn(AccountRepositoryStub, 'add');
    await sut.perform(makeFakeAddAccountData());
    expect(addAccountRepositorySpy).toHaveBeenCalledWith({
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'hashed_password',
      createdAt: new Date(),
    });
  });

  it('Should return token on success', async () => {
    const { sut } = makeSut();
    const result = await sut.perform(makeFakeAddAccountData());
    expect(result).toBe('any_token');
  });
});
