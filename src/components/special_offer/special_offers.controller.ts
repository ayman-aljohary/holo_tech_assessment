import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Res,
  Req,
  HttpStatus,
  UsePipes,
  ValidationPipe,
  Body,
  Param,
} from '@nestjs/common';
import { Response, Request } from 'express';
import { SpecialOffersService } from './special_offers.service';
import { CreateSpecialOfferDto } from '../../../dtos/CreateSpecialOfferDto';
import { ApiBody } from '@nestjs/swagger';

@Controller('special_offer')
export class SpecialOffersController {
  constructor(private specialOffersService: SpecialOffersService) {}
  @Post()
  @ApiBody({
    type: CreateSpecialOfferDto,
    description: 'Json structure for special-offer object',
  })
  @UsePipes(new ValidationPipe({ transform: true }))
  async create(
    @Body() createSpecialOfferDto: CreateSpecialOfferDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    try {
      await this.specialOffersService.save(createSpecialOfferDto);
      return res.status(HttpStatus.CREATED).send(createSpecialOfferDto);
    } catch ({ errors }) {
      return res.status(HttpStatus.BAD_REQUEST).send(errors);
    }
  }

  @Get('/all')
  async getAll(@Req() req: Request, @Res() res: Response) {
    const specialOffer = await this.specialOffersService.getAll();
    return res.status(HttpStatus.OK).send(specialOffer);
  }

  @Get('/:id')
  async getOne(
    @Param('id') id: string,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const specialOffer = await this.specialOffersService.getOne(id);
    if (specialOffer) return res.status(HttpStatus.OK).send(specialOffer);
    res.status(HttpStatus.NOT_FOUND).send();
  }

  @Patch('/:id')
  async updateOne(
    @Param('id') id: string,
    @Body() createSpecialOfferDto: CreateSpecialOfferDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    try {
      await this.specialOffersService.updateOne(id, createSpecialOfferDto);
      return res.status(HttpStatus.ACCEPTED).send(createSpecialOfferDto);
    } catch ({ errors }) {
      return res.status(HttpStatus.BAD_REQUEST).send(errors);
    }
  }

  @Delete('/:id')
  async deleteOne(
    @Param('id') id: string,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    try {
      await this.specialOffersService.remove(id);
      return res.status(HttpStatus.NO_CONTENT).send();
    } catch ({ errors }) {
      return res.status(HttpStatus.BAD_REQUEST).send(errors);
    }
  }
}
