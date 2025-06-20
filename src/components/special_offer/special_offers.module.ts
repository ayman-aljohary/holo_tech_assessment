import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { SpecialOffer } from '../../../models/SpecialOffer.model';
import { SpecialOffersController } from './special_offers.controller';
import { SpecialOffersService } from './special_offers.service';

@Module({
  imports: [SequelizeModule.forFeature([SpecialOffer])],
  providers: [SpecialOffersService],
  controllers: [SpecialOffersController],
})
export class SpecialOffersModule {}
