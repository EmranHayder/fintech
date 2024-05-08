import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { Account } from './entity/account.entity';
import { UpdateAccountDto } from './dto/update-account.dto';

@Controller('accounts')
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  @Post()
  create(@Body() createAccountDto: CreateAccountDto): Account {
    return this.accountsService.create(createAccountDto);
  }

  @Get()
  findAll(): Account[] {
    return this.accountsService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string): Account {
    return this.accountsService.findById(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateAccountDto: UpdateAccountDto): Account {
    return this.accountsService.update(id, updateAccountDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string): void {
    this.accountsService.delete(id);
  }
}
