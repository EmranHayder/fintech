import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { BeneficiariesModule } from './beneficiaries/beneficiaries.module';
import { TransactionsModule } from './transactions/transactions.module';
import { AccountsModule } from './accounts/accounts.module';

@Module({
  imports: [UsersModule, BeneficiariesModule, TransactionsModule, AccountsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
