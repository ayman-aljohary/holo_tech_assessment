import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { VoucherCode } from '../../../models/VoucherCode.model';
import { VoucherCodeController } from './voucher_codes.controller';
import { VoucherCodesService } from './voucher_codes.service';

@Module({
  imports: [SequelizeModule.forFeature([VoucherCode])],
  providers: [VoucherCodesService],
  controllers: [VoucherCodeController],
})
export class VoucherCodesModule {}
