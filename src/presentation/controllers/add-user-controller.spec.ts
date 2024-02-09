import { AddAccount, AddAccountData } from 'src/domain/protocols/add-account';
import { JoiAdapter } from 'src/infra/dataValidator/joi-adapter';
import { SchemaError } from '../errors/schema-error';
import { AddUserController } from './add-user-controller';

const makeAddAccount = (): AddAccount => {
  class AddAccountStub implements AddAccount {
    perform(data: AddAccountData): Promise<string | Error> {
      return Promise.resolve('token');
    }
  }
  return new AddAccountStub();
};

const addAccountStub = makeAddAccount();
const validatorStub = new JoiAdapter();

describe('AddUserController', () => {
  it('Should return 400 if name field is not provided', async () => {
    const sut = new AddUserController(addAccountStub, validatorStub);
    const httpResponse = await sut.execute({
      email: 'any_email@mail.com',
      password: 'any_password',
      passwordConfirmation: 'any_password',
      name: '',
    });
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new SchemaError('The name field is required'));
  });

  it('Should return 400 if email field is not provided', async () => {
    const sut = new AddUserController(addAccountStub, validatorStub);
    const httpResponse = await sut.execute({
      name: 'any_name',
      password: 'any_password',
      passwordConfirmation: 'any_password',
      email: '',
    });
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new SchemaError('The email field is required'));
  });

  it('Should return 400 if password field is not provided', async () => {
    const sut = new AddUserController(addAccountStub, validatorStub);
    const httpResponse = await sut.execute({
      name: 'any_name',
      email: 'any_email@mail.com',
      passwordConfirmation: 'any_password',
      password: '',
    });
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new SchemaError('The password field is required'));
  });

  it('Should return 400 if passwordConfirmation field is not provided', async () => {
    const sut = new AddUserController(addAccountStub, validatorStub);
    const httpResponse = await sut.execute({
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'any_password',
      passwordConfirmation: '',
    });
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new SchemaError('The passwordConfirmation field is required'));
  });

  it('Should return 400 if password is different from passwordConfirmation', async () => {
    const sut = new AddUserController(addAccountStub, validatorStub);
    const httpResponse = await sut.execute({
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'any_password',
      passwordConfirmation: 'invalid_password',
    });
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new Error('Password is different from passwordConfirmation'));
  });

  it('Should call AddAccount with correct values', async () => {
    const sut = new AddUserController(addAccountStub, validatorStub);
    const performSpy = jest.spyOn(addAccountStub, 'perform');
    await sut.execute({
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'any_password',
      passwordConfirmation: 'any_password',
    });
    expect(performSpy).toHaveBeenCalledWith({
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'any_password',
    });
  });

  it('Should return 400 if AddAccount returns an Error', async () => {
    const sut = new AddUserController(addAccountStub, validatorStub);
    jest.spyOn(addAccountStub, 'perform').mockReturnValueOnce(Promise.resolve(new Error('any_message')));
    const httpResponse = await sut.execute({
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'any_password',
      passwordConfirmation: 'any_password',
    });
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new Error('any_message'));
  });

  it('Should return 200 on success', async () => {
    const sut = new AddUserController(addAccountStub, validatorStub);
    const httpResponse = await sut.execute({
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'any_password',
      passwordConfirmation: 'any_password',
    });
    expect(httpResponse.statusCode).toBe(200);
    expect(httpResponse.body).toEqual({ accessToken: 'token' });
  });
});
