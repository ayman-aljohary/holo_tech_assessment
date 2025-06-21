import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Res,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { VoucherCodesService } from './voucher_codes.service';
import { CreateVoucherCodeDto } from '../../../dtos/CreateVoucherCodeDto';
import { ApiBody } from '@nestjs/swagger';
import { VerifyVoucherCodeDto } from '../../../dtos/VerifyVoucherCodeDto';

@Controller('voucher_code')
export class VoucherCodesController {
  constructor(private voucherCodesService: VoucherCodesService) {}
  @Post()
  @ApiBody({
    type: CreateVoucherCodeDto,
    description: 'Json structure for voucher-code object',
  })
  @UsePipes(new ValidationPipe({ transform: true }))
  async create(
    @Body() createVoucherCodeDto: CreateVoucherCodeDto,
    @Res() res: Response,
  ) {
    try {
      await this.voucherCodesService.save(createVoucherCodeDto);
      return res.status(HttpStatus.CREATED).send(createVoucherCodeDto);
    } catch ({ errors }) {
      return res.status(HttpStatus.BAD_REQUEST).send(errors);
    }
  }

  @Get('/all')
  async getAll(@Res() res: Response) {
    const voucherCodes = await this.voucherCodesService.getAll();
    return res.status(HttpStatus.OK).send(voucherCodes);
  }

  @Get('/:id')
  async getOne(@Param('id') id: string, @Res() res: Response) {
    const voucherCodes = await this.voucherCodesService.getOne(id);
    if (voucherCodes) return res.status(HttpStatus.OK).send(voucherCodes);
    res.status(HttpStatus.NOT_FOUND).send();
  }

  @Patch('/:id')
  async updateOne(
    @Param('id') id: string,
    @Body() createVoucherCodeDto: CreateVoucherCodeDto,
    @Res() res: Response,
  ) {
    try {
      await this.voucherCodesService.updateOne(id, createVoucherCodeDto);
      return res.status(HttpStatus.ACCEPTED).send(createVoucherCodeDto);
    } catch ({ errors }) {
      return res.status(HttpStatus.BAD_REQUEST).send(errors);
    }
  }

  @Delete('/:id')
  async deleteOne(@Param('id') id: string, @Res() res: Response) {
    try {
      await this.voucherCodesService.remove(id);
      return res.status(HttpStatus.NO_CONTENT).send();
    } catch ({ errors }) {
      return res.status(HttpStatus.BAD_REQUEST).send(errors);
    }
  }

  @Post('/verify')
  @UsePipes(new ValidationPipe({ transform: true }))
  async verifyVoucher(
    @Body() verifyVoucherCodeDto: VerifyVoucherCodeDto,
    @Res() res: Response,
  ) {
    return res
      .status(HttpStatus.OK)
      .send(
        (await this.voucherCodesService.verifyVoucher(verifyVoucherCodeDto))
          .length > 0,
      );
  }

  @Post('/redeem')
  @UsePipes(new ValidationPipe({ transform: true }))
  async redeemVoucher(
    @Body() verifyVoucherCodeDto: VerifyVoucherCodeDto,
    @Res() res: Response,
  ) {
    const vouchers =
      await this.voucherCodesService.verifyVoucher(verifyVoucherCodeDto);
    if (vouchers.length > 0) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const voucher = vouchers[0].toJSON();
      await vouchers[0].update({ usageDate: '2025-06-22' });
      return res.status(HttpStatus.OK).send(
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        `Congrats \`${voucher?.customer.name}\`, you have ${voucher.specialOffer.discount}% discount.`,
      );
    }
    return res.status(HttpStatus.BAD_REQUEST).send('Invalid Code');
  }
}
