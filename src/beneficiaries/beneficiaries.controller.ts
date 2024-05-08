import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { BeneficiariesService } from './beneficiaries.service';
import { CreateBeneficiaryDto } from './dto/create-beneficiary.dto';
import { Beneficiary } from './entity/beneficiary.entity';
import { UpdateBeneficiaryDto } from './dto/update-beneficiary.dto';

@Controller('beneficiaries')
export class BeneficiariesController {
  constructor(private readonly beneficiariesService: BeneficiariesService) {}

  @Post()
  create(@Body() createBeneficiaryDto: CreateBeneficiaryDto): Beneficiary {
    return this.beneficiariesService.create(createBeneficiaryDto);
  }

  @Get()
  findAll(): Beneficiary[] {
    return this.beneficiariesService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string): Beneficiary {
    return this.beneficiariesService.findById(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateBeneficiaryDto: UpdateBeneficiaryDto): Beneficiary {
    return this.beneficiariesService.update(id, updateBeneficiaryDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string): void {
    this.beneficiariesService.delete(id);
  }
}
