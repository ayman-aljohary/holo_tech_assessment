import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { VoucherCode } from '../../../models/VoucherCode.model';
import { VoucherCodesController } from './voucher_codes.controller';
import { VoucherCodesService } from './voucher_codes.service';

@Module({
  imports: [SequelizeModule.forFeature([VoucherCode])],
  providers: [VoucherCodesService],
  controllers: [VoucherCodesController],
})
export class VoucherCodesModule {}
