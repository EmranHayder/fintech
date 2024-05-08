import { Test, TestingModule } from '@nestjs/testing';
import { AccountsController } from './accounts.controller';
import { AccountsService } from './accounts.service';
import { CreateAccountDto } from './dto/create-account.dto';

describe('AccountsController', () => {
  let controller: AccountsController;
  let service: AccountsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AccountsController],
      providers: [AccountsService],
    }).compile();

    controller = module.get<AccountsController>(AccountsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create an account', () => {
    const createDto: CreateAccountDto = {
      userId: '1',
      accountNumber: '1234567890',
      accountType: 'Current',
    };

    const account = service.create(createDto);

    expect(account).toBeDefined();
    expect(account.userId).toEqual(createDto.userId);
    expect(account.accountNumber).toEqual(createDto.accountNumber);
    expect(account.accountType).toEqual(createDto.accountType);
    expect(account.balance).toEqual(0); // New account balance should be 0
    expect(account.status).toEqual('Active'); // Default status
  });
});
