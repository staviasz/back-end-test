import { Module } from '@nestjs/common';
import { AccountModule } from './routes/account-routes.module';

@Module({
  imports: [AccountModule],
})
export class AppModule {}
