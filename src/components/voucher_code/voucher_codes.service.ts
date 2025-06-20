import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { VoucherCode } from '../../../models/VoucherCode.model';
import { Customer } from '../../../models/Customer.model';
import { SpecialOffer } from '../../../models/SpecialOffer.model';

@Injectable()
export class VoucherCodesService {
  constructor(
    @InjectModel(VoucherCode)
    private voucherCodeModel: typeof VoucherCode,
  ) {}

  getAll(): Promise<VoucherCode[]> {
    return this.voucherCodeModel.findAll({
      include: [{ model: Customer }, { model: SpecialOffer }],
    });
  }

  getOne(id): Promise<VoucherCode | null> {
    return this.voucherCodeModel.findByPk(id, {
      include: [{ model: Customer }, { model: SpecialOffer }],
    });
  }

  async updateOne(id, voucherCodeData): Promise<VoucherCode> {
    const voucherCode = await this.voucherCodeModel.findOne(id);
    await voucherCode?.update(voucherCodeData);
    return voucherCode;
  }

  save(newVoucherCode): Promise<VoucherCode> {
    return this.voucherCodeModel.create(newVoucherCode);
  }

  async remove(id): Promise<VoucherCode> {
    const voucherCode = await this.voucherCodeModel.findOne(id);
    await voucherCode?.destroy();
    return voucherCode;
  }
}
