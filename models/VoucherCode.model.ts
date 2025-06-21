import {
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Customer } from './Customer.model';
import { SpecialOffer } from './SpecialOffer.model';
import { Type } from 'class-transformer';

@Table
export class VoucherCode extends Model {
  @Column
  code: string;

  @Column
  @ForeignKey(() => Customer)
  customerId: number;

  @Column
  @ForeignKey(() => SpecialOffer)
  specialOfferId: number;

  @Column
  @Type(() => Date)
  expirationDate: Date;

  @Column
  oneTimeUsage: boolean;

  @Column
  @Type(() => Date)
  usageDate: Date;

  @BelongsTo(() => Customer)
  customer: Customer;

  @BelongsTo(() => SpecialOffer)
  specialOffer: SpecialOffer;
}
