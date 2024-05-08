import { Injectable, NotFoundException } from '@nestjs/common';
import { Transaction } from './entity/transaction.entity';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { AccountsService } from '../accounts/accounts.service';
import { BeneficiariesService } from '../beneficiaries/beneficiaries.service';

@Injectable()
export class TransactionsService {
    private transactions: Transaction[] = [];

  constructor(
    private readonly accountService: AccountsService,
    private readonly beneficiaryService: BeneficiariesService,
  ) {}

  createTransaction(createTransactionDto: CreateTransactionDto): Transaction {
    const { accountId, beneficiaryId, amount, description } = createTransactionDto;

    const account = this.accountService.findById(accountId);
    if (!account) {
      throw new NotFoundException('Account not found');
    }

    const beneficiary = this.beneficiaryService.findById(beneficiaryId);
    if (!beneficiary) {
      throw new NotFoundException('Beneficiary not found');
    }

    if (account.balance < amount) {
      throw new Error('Insufficient balance');
    }

    const transaction: Transaction = {
      id: (Math.random() * 1000).toString(), // Generate random ID (not recommended for production)
      accountId,
      beneficiaryId,
      amount,
      description,
      datetime: new Date(),
      status: 'Pending',
    };

    this.transactions.push(transaction);

    // Update account balance
    account.balance -= amount;

    return transaction;
  }
}
