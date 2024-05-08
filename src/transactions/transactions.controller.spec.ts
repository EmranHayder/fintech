import { Test, TestingModule } from '@nestjs/testing';
import { TransactionsController } from './transactions.controller';
import { TransactionsService } from './transactions.service';
import { AccountsService } from '../accounts/accounts.service';
import { BeneficiariesService } from '../beneficiaries/beneficiaries.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { NotFoundException } from '@nestjs/common';

describe('TransactionsController', () => {
  let controller: TransactionsController;
  let service: TransactionsService;
  let accountService: AccountsService;
  let beneficiaryService: BeneficiariesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TransactionsService,
        {
          provide: AccountsService,
          useValue: {
            findById: jest.fn(id => ({ id, balance: 100 })),
          },
        },
        {
          provide: BeneficiariesService,
          useValue: {
            findById: jest.fn(id => ({ id, name: 'Test Beneficiary' })),
          },
        },
      ],
    }).compile();

    service = module.get<TransactionsService>(TransactionsService);
    accountService = module.get<AccountsService>(AccountsService);
    beneficiaryService = module.get<BeneficiariesService>(BeneficiariesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a transaction', () => {
    const createTransactionDto: CreateTransactionDto = {
      accountId: '1',
      beneficiaryId: '1',
      amount: 50,
      description: 'Test Transaction',
    };

    const transaction = service.createTransaction(createTransactionDto);

    expect(transaction).toBeDefined();
    expect(transaction.accountId).toEqual(createTransactionDto.accountId);
    expect(transaction.beneficiaryId).toEqual(createTransactionDto.beneficiaryId);
    expect(transaction.amount).toEqual(createTransactionDto.amount);
    expect(transaction.description).toEqual(createTransactionDto.description);
    expect(transaction.status).toEqual('Pending');
  });

  it('should throw an error if account not found', () => {
    jest.spyOn(accountService, 'findById').mockReturnValueOnce(null);

    const createTransactionDto: CreateTransactionDto = {
      accountId: '999', // Invalid account ID
      beneficiaryId: '1',
      amount: 50,
      description: 'Test Transaction',
    };

    expect(() => service.createTransaction(createTransactionDto)).toThrowError(NotFoundException);
  });

  it('should throw an error if beneficiary not found', () => {
    jest.spyOn(beneficiaryService, 'findById').mockReturnValueOnce(null);

    const createTransactionDto: CreateTransactionDto = {
      accountId: '1',
      beneficiaryId: '999', // Invalid beneficiary ID
      amount: 50,
      description: 'Test Transaction',
    };

    expect(() => service.createTransaction(createTransactionDto)).toThrowError(NotFoundException);
  });

  it('should throw an error if account balance is insufficient', () => {
    jest.spyOn(accountService, 'findById').mockReturnValueOnce({
      id: '1', balance: 10,
      userId: '',
      accountNumber: '',
      accountType: 'Current',
      status: 'Active'
    });

    const createTransactionDto: CreateTransactionDto = {
      accountId: '1',
      beneficiaryId: '1',
      amount: 50, // Amount exceeds balance
      description: 'Test Transaction',
    };

    expect(() => service.createTransaction(createTransactionDto)).toThrowError(Error);
  });
});
