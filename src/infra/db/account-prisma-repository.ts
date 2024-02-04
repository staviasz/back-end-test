import { PrismaClient } from '@prisma/client';
import { AccountModel } from 'src/domain/models/account';
import { AddAccountRepository, AddAccountRepositoryData } from 'src/usecases/protocols/db/add-account-repository';
import { LoadAccountByEmailRepository } from 'src/usecases/protocols/db/load-account-by-email-repository';

export class AccountPrismaRepository implements AddAccountRepository, LoadAccountByEmailRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async add(data: AddAccountRepositoryData): Promise<AccountModel> {
    const account = await this.prisma.account.create({
      data,
      select: {
        id: true,
        name: true,
        email: true,
        password: true,
        createdAt: true,
      },
    });
    return account;
  }

  async loadByEmail(email: string): Promise<null | AccountModel> {
    const accountOrNull = await this.prisma.account.findUnique({ where: { email } });
    return accountOrNull;
  }
}
