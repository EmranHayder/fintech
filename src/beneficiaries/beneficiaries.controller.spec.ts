import { Test, TestingModule } from '@nestjs/testing';
import { BeneficiariesController } from './beneficiaries.controller';
import { BeneficiariesService } from './beneficiaries.service';
import { CreateBeneficiaryDto } from './dto/create-beneficiary.dto';

describe('BeneficiariesController', () => {
  let controller: BeneficiariesController;
  let service: BeneficiariesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BeneficiariesController],
      providers: [BeneficiariesService],
    }).compile();

    controller = module.get<BeneficiariesController>(BeneficiariesController);
    service = module.get<BeneficiariesService>(BeneficiariesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a beneficiary', () => {
    const createDto: CreateBeneficiaryDto = {
      name: 'Test Beneficiary',
      accountNumber: '1234567890',
      bankName: 'Test Bank',
    };

    const createdBeneficiary = service.create(createDto);

    expect(createdBeneficiary).toBeDefined();
    expect(createdBeneficiary.name).toEqual(createDto.name);
    expect(createdBeneficiary.accountNumber).toEqual(createDto.accountNumber);
    expect(createdBeneficiary.bankName).toEqual(createDto.bankName);
  });
});
