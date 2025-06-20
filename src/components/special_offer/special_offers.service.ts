import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { SpecialOffer } from '../../../models/SpecialOffer.model';

@Injectable()
export class SpecialOffersService {
  constructor(
    @InjectModel(SpecialOffer)
    private specialOfferModel: typeof SpecialOffer,
  ) {}

  getAll(): Promise<SpecialOffer[]> {
    return this.specialOfferModel.findAll();
  }

  getOne(id): Promise<SpecialOffer | null> {
    return this.specialOfferModel.findOne({ where: { id } });
  }

  async updateOne(id, specialOfferData): Promise<SpecialOffer> {
    const specialOffer = await this.specialOfferModel.findOne(id);
    await specialOffer?.update(specialOfferData);
    return specialOffer;
  }

  save(newSpecialOffer): Promise<SpecialOffer> {
    return this.specialOfferModel.create(newSpecialOffer);
  }

  async remove(id): Promise<SpecialOffer> {
    const specialOffer = await this.specialOfferModel.findOne(id);
    await specialOffer?.destroy();
    return specialOffer;
  }
}
