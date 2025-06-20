import { Column, Model, Table } from 'sequelize-typescript';

@Table
export class SpecialOffer extends Model {
  @Column
  name: string;

  @Column
  discount: number;
}
