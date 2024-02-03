import { AccountModel } from 'src/domain/models/account';
import { AddAccountData } from 'src/domain/protocols/add-account';
import { AddAccountUseCase } from './add-account-usecase';
import { LoadAccountByEmailRepository } from '../protocols/db/load-account-by-email-repository';

const makeFakeAddAccountData = (): AddAccountData => ({
  name: 'any_name',
  email: 'any_email@mail.com',
  password: 'any_password',
});

const makeFakeAccount = (): AccountModel => ({
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

interface SutTypes {
  sut: AddAccountUseCase;
  loadAccountByEmailRepositoryStub: LoadAccountByEmailRepository;
}

const makeSut = (): SutTypes => {
  const loadAccountByEmailRepositoryStub = makeLoadAccountByEmailRepositoryStub();
  const sut = new AddAccountUseCase(loadAccountByEmailRepositoryStub);
  return { sut, loadAccountByEmailRepositoryStub };
};

describe('AddAccountUseCase', () => {
  it('Should call LoadAccountByEmailRepository with correct email', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut();
    const loadByEmailSpy = jest.spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail');
    await sut.perform(makeFakeAddAccountData());
    expect(loadByEmailSpy).toHaveBeenCalledWith('any_email@mail.com');
  });
});
