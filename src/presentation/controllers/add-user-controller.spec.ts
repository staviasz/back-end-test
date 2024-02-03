import { RequiredFieldError } from '../errors/required-field-error';
import { AddUserController } from './add-user-controller';

describe('AddUserController', () => {
  it('Should return 400 if name field is not provided', async () => {
    const sut = new AddUserController();
    const httpResponse = await sut.execute({
      body: {
        email: 'any_email@mail.com',
        password: 'any_password',
        passwordConfirmation: 'any_password',
      },
    });
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new RequiredFieldError('The name field is required'));
  });

  it('Should return 400 if email field is not provided', async () => {
    const sut = new AddUserController();
    const httpResponse = await sut.execute({
      body: {
        name: 'any_name',
        password: 'any_password',
        passwordConfirmation: 'any_password',
      },
    });
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new RequiredFieldError('The email field is required'));
  });

  it('Should return 400 if password field is not provided', async () => {
    const sut = new AddUserController();
    const httpResponse = await sut.execute({
      body: {
        name: 'any_name',
        email: 'any_email@mail.com',
        passwordConfirmation: 'any_password',
      },
    });
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new RequiredFieldError('The password field is required'));
  });

  it('Should return 400 if passwordConfirmation field is not provided', async () => {
    const sut = new AddUserController();
    const httpResponse = await sut.execute({
      body: {
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'any_password',
      },
    });
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new RequiredFieldError('The passwordConfirmation field is required'));
  });

  it('Should return 400 if password is different from passwordConfirmation', async () => {
    const sut = new AddUserController();
    const httpResponse = await sut.execute({
      body: {
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'any_password',
        passwordConfirmation: 'invalid_password',
      },
    });
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new Error('Password is different from passwordConfirmation'));
  });
});
