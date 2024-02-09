import { PrismaClient } from '@prisma/client';
import { BcryptAdapter } from 'src/infra/cryptography/bcrypt-adapter';
import { JoiAdapter } from 'src/infra/dataValidator/joi-adapter';
import { AccountPrismaRepository } from 'src/infra/db/account-prisma-repository';
import { Controller } from 'src/presentation/contracts/controller';
import { AddUserController } from 'src/presentation/controllers/add-user-controller';
import { AddAccountUseCase } from 'src/usecases/implementations/add-account-usecase';

export const makeAddUserController = (): Controller => {
  const prisma = new PrismaClient();
  const accountRepository = new AccountPrismaRepository(prisma);
  const bcrypt = new BcryptAdapter();
  const validator = new JoiAdapter();
  // const addAccountUseCase = new AddAccountUseCase(accountRepository, bcrypt, accountRepository);
  const addAccountUseCase = new AddAccountUseCase(bcrypt, accountRepository);
  return new AddUserController(addAccountUseCase, validator);
};
