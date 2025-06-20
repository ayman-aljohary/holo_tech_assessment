import { Column, HasMany, Model, Table } from 'sequelize-typescript';
import { VoucherCode } from './VoucherCode.model';

@Table
export class Customer extends Model {
  @Column
  name: string;

  @Column
  email: string;

  @HasMany(() => VoucherCode)
  voucherCodes: VoucherCode[];
}
