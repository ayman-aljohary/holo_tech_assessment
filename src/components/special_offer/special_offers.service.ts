import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { SpecialOffer } from '../../../models/SpecialOffer.model';
import { Sequelize } from 'sequelize-typescript';

@Injectable()
export class SpecialOffersService {
  constructor(
    @InjectModel(SpecialOffer)
    private specialOfferModel: typeof SpecialOffer,
    private sequelize: Sequelize,
  ) {}

  getAll(): Promise<SpecialOffer[]> {
    return this.specialOfferModel.findAll();
  }

  getOne(id): Promise<SpecialOffer | null> {
    return this.specialOfferModel.findOne({ where: { id } });
  }

  async updateOne(id, specialOfferData): Promise<SpecialOffer | null> {
    const specialOffer = await this.specialOfferModel.findOne({
      where: { id },
    });
    await this.sequelize.transaction(async (t) => {
      const transactionHost = { transaction: t };
      await specialOffer?.update(specialOfferData, transactionHost);
    });
    return specialOffer;
  }

  async save(newSpecialOffer): Promise<any> {
    await this.sequelize.transaction(async (t) => {
      const transactionHost = { transaction: t };
      await this.specialOfferModel.create(newSpecialOffer, transactionHost);
    });
    return newSpecialOffer;
  }

  async remove(id): Promise<SpecialOffer| null> {
    const specialOffer = await this.specialOfferModel.findOne({
      where: { id },
    });
    await specialOffer?.destroy();
    return specialOffer;
  }
}
