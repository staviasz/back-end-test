import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { PrismaClient } from '@prisma/client';
import { AppModule } from '../app.module';
import * as request from 'supertest';

let app: INestApplication;
let prisma: PrismaClient;

describe('Account Routes', () => {
  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = module.createNestApplication();
    await app.init();
    prisma = new PrismaClient();
    await prisma.account.deleteMany({});
  });

  afterEach(async () => {
    await app.close();
  });

  describe('POST /account', () => {
    it('Should return 200 if an Account is added successfully', async () => {
      await request(app.getHttpServer())
        .post('/account')
        .send({
          name: 'any_name',
          email: 'any_email.com',
          password: 'any_password',
          passwordConfirmation: 'any_password',
        })
        .expect(200);
    });
  });
});
