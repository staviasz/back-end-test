import { validate } from 'class-validator';
import { AddAccount } from 'src/domain/protocols/add-account';
import { Controller } from '../contracts/controller';
import { CreateUserDto } from '../dto/create-user.dto';
import { HttpResponse } from '../types/http';

export class AddUserController implements Controller {
  constructor(private readonly addAccount: AddAccount) {}

  async execute(createUserDto: CreateUserDto): Promise<HttpResponse> {
    console.log(createUserDto);
    const errors = await validate(createUserDto);

    if (errors.length > 0) {
      // Se houver erros de validação, trate-os aqui
      console.error('Erros de validação:', errors);
      throw new Error('Erro de validação');
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
    console.log('passei aqui');

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
