import { Injectable } from '@nestjs/common';
import { UpdateBeneficiaryDto } from './dto/update-beneficiary.dto';
import { Beneficiary } from './entity/beneficiary.entity';
import { CreateBeneficiaryDto } from './dto/create-beneficiary.dto';

@Injectable()
export class BeneficiariesService {
    private beneficiaries: Beneficiary[] = [];

    create(createBeneficiaryDto: CreateBeneficiaryDto): Beneficiary {
      const beneficiary: Beneficiary = {
        id: (Math.random() * 1000).toString(), // Generate random ID (not recommended for production)
        ...createBeneficiaryDto,
      };
      this.beneficiaries.push(beneficiary);
      return beneficiary;
    }
  
    findAll(): Beneficiary[] {
      return this.beneficiaries;
    }
  
    findById(id: string): Beneficiary {
      return this.beneficiaries.find(beneficiary => beneficiary.id === id);
    }
  
    update(id: string, updateBeneficiaryDto: UpdateBeneficiaryDto): Beneficiary {
      const beneficiary = this.findById(id);
      if (!beneficiary) {
        return null;
      }
      Object.assign(beneficiary, updateBeneficiaryDto);
      return beneficiary;
    }
  
    delete(id: string): void {
      this.beneficiaries = this.beneficiaries.filter(beneficiary => beneficiary.id !== id);
    }
}
