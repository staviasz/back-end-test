import { PrismaClient } from '@prisma/client';
import { AccountModel } from 'src/domain/models/account';
import { AddAccountRepository, AddAccountRepositoryData } from 'src/usecases/protocols/db/add-account-repository';

export class AccountPrismaRepository implements AddAccountRepository {
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
}
