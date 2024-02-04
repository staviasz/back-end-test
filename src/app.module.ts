import { Module } from '@nestjs/common';
import { AccountModule } from './main/routes/account-routes.module';

@Module({
  imports: [AccountModule],
})
export class AppModule {}
