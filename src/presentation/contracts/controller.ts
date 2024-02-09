import { CreateUserDto } from '../dto/create-user.dto';
import { HttpResponse } from '../types/http';

export interface Controller {
  execute: (createUserDto: CreateUserDto) => Promise<HttpResponse>;
}
