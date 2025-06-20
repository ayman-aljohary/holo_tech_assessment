import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { VoucherCode } from '../../../models/VoucherCode.model';
import { Customer } from '../../../models/Customer.model';
import { SpecialOffer } from '../../../models/SpecialOffer.model';
import { Sequelize } from 'sequelize-typescript';
import { Op } from 'sequelize';
import { VerifyVoucherCodeDto } from '../../../dtos/VerifyVoucherCodeDto';

@Injectable()
export class VoucherCodesService {
  constructor(
    @InjectModel(VoucherCode)
    private voucherCodeModel: typeof VoucherCode,
    private sequelize: Sequelize,
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

  async updateOne(id, voucherCodeData): Promise<VoucherCode | null> {
    const voucherCode = await this.voucherCodeModel.findOne({ where: { id } });
    await this.sequelize.transaction(async (t) => {
      const transactionHost = { transaction: t };
      await voucherCode?.update(voucherCodeData, transactionHost);
    });
    return voucherCode;
  }
  async save(newVoucherCode): Promise<any> {
    await this.sequelize.transaction(async (t) => {
      const transactionHost = { transaction: t };
      await this.voucherCodeModel.create(newVoucherCode, transactionHost);
    });
    return newVoucherCode;
  }

  async remove(id): Promise<VoucherCode | null> {
    const voucherCode = await this.voucherCodeModel.findOne({ where: { id } });
    await voucherCode?.destroy();
    return voucherCode;
  }

  async verifyVoucher(
    voucherData: VerifyVoucherCodeDto,
  ): Promise<VoucherCode[]> {
    const status = await this.voucherCodeModel.findAll({
      where: {
        code: voucherData?.code,
        customerId: voucherData?.customerId,
        specialOfferId: voucherData?.specialOfferId,
        expirationDate: { [Op.gt]: new Date() },
      },
      include: [{ model: Customer }, { model: SpecialOffer }],
    });
    return status;
  }
}
