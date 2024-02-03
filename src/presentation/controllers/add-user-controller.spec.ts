import { RequiredFieldError } from '../errors/required-field-error';
import { AddUserController } from './add-user-controller';

describe('AddUserController', () => {
  it('Should return 400 if name field is not provided', async () => {
    const sut = new AddUserController();
    const httpResponse = await sut.execute({
      body: { value: 'any_value' },
    });
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new RequiredFieldError('The name field is required'));
  });
});
