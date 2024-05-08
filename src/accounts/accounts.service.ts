import { Injectable } from '@nestjs/common';
import { UpdateAccountDto } from './dto/update-account.dto';
import { Account } from './entity/account.entity';
import { CreateAccountDto } from './dto/create-account.dto';

@Injectable()
export class AccountsService {
    private accounts: Account[] = [];

  create(createAccountDto: CreateAccountDto): Account {
    const account: Account = {
      id: (Math.random() * 1000).toString(), // Generate random ID (not recommended for production)
      balance: 0, // Initialize balance to 0
      ...createAccountDto,
      status: 'Active', // Default status
    };
    this.accounts.push(account);
    return account;
  }

  findAll(): Account[] {
    return this.accounts;
  }

  findById(id: string): Account {
    return this.accounts.find(account => account.id === id);
  }

  update(id: string, updateAccountDto: UpdateAccountDto): Account {
    const account = this.findById(id);
    if (!account) {
      return null;
    }
    Object.assign(account, updateAccountDto);
    return account;
  }

  delete(id: string): void {
    this.accounts = this.accounts.filter(account => account.id !== id);
  }
}
