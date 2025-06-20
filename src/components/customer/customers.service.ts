import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Customer } from '../../../models/Customer.model';
import { VoucherCode } from '../../../models/VoucherCode.model';
import { Sequelize } from 'sequelize-typescript';

@Injectable()
export class CustomersService {
  constructor(
    @InjectModel(Customer)
    private customerModel: typeof Customer,
    private sequelize: Sequelize,
  ) {}

  getAll(): Promise<Customer[]> {
    return this.customerModel.findAll({
      include: [{ model: VoucherCode }],
    });
  }

  getOne(id): Promise<Customer | null> {
    return this.customerModel.findByPk(id, {
      include: [{ model: VoucherCode }],
    });
  }

  async updateOne(id, customerData): Promise<void> {
    const customer = await this.customerModel.findOne(id);
    await customer?.update(customerData);
  }

  async save(newCustomer): Promise<any> {
    await this.sequelize.transaction(async (t) => {
      const transactionHost = { transaction: t };
      await this.customerModel.create(newCustomer, transactionHost);
    });
    return newCustomer;
  }

  async remove(id): Promise<Customer> {
    const customer = await this.customerModel.findOne(id);
    await customer?.destroy();
    return customer;
  }
}
