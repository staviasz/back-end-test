import { AddAccount } from 'src/domain/protocols/add-account';
import { ValidatorSchema } from 'src/usecases/protocols/dataValidator/validatorSchema';
import { Controller } from '../contracts/controller';
import { CreateUserDto } from '../dto/create-user.dto';
import { SchemaError } from '../errors/schema-error';
import { HttpResponse } from '../types/http';
import { createUserSchema } from '../validators/schema-create-user';

export class AddUserController implements Controller {
  constructor(
    private readonly addAccount: AddAccount,
    private readonly validator: ValidatorSchema,
  ) {}

  async execute(createUserDto: CreateUserDto): Promise<HttpResponse> {
    const messageError = this.validator.validate(createUserDto, createUserSchema);
    if (messageError) {
      return { statusCode: 400, body: new SchemaError(messageError) };
    }

    if (createUserDto.password !== createUserDto.passwordConfirmation) {
      return { statusCode: 400, body: new SchemaError('Password is different from passwordConfirmation') };
    }

    const addAccountResult = await this.addAccount.perform({
      name: createUserDto.name,
      email: createUserDto.email,
      password: createUserDto.password,
    });
    if (addAccountResult instanceof Error) {
      return { statusCode: 400, body: addAccountResult };
    }
    return { statusCode: 200, body: { accessToken: addAccountResult } };
  }
}

// if (!httpRequest.body.name) {
//   return {
//     statusCode: 400,
//     body: new RequiredFieldError('The name field is required'),
//   };
// } else if (!httpRequest.body.email) {
//   return {
//     statusCode: 400,
//     body: new RequiredFieldError('The email field is required'),
//   };
// } else if (!httpRequest.body.password) {
//   return {
//     statusCode: 400,
//     body: new RequiredFieldError('The password field is required'),
//   };
// } else if (!httpRequest.body.passwordConfirmation) {
//   return {
//     statusCode: 400,
//     body: new RequiredFieldError('The passwordConfirmation field is required'),
//   };
// } else if (httpRequest.body.password !== httpRequest.body.passwordConfirmation) {
//   return {
//     statusCode: 400,
//     body: new Error('Password is different from passwordConfirmation'),
//   };
// }
