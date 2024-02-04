import { Module } from '@nestjs/common';
import { AccountRoutes } from './account-routes';

@Module({
  controllers: [AccountRoutes],
})
export class AccountModule {}
