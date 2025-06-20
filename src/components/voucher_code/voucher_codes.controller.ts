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
import { VoucherCodesService } from './voucher_codes.service';
import { CreateVoucherCodeDto } from '../../../dtos/CreateVoucherCodeDto';
import { ApiBody } from '@nestjs/swagger';

@Controller('voucher_code')
export class VoucherCodeController {
  constructor(private voucherCodesService: VoucherCodesService) {}
  @Post()
  @ApiBody({
    type: CreateVoucherCodeDto,
    description: 'Json structure for voucher-code object',
  })
  @UsePipes(new ValidationPipe({ transform: true }))
  async create(
    @Body() createVoucherCodeDto: CreateVoucherCodeDto,
    @Req() req: Request,
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
  async getAll(@Req() req: Request, @Res() res: Response) {
    const voucherCodes = await this.voucherCodesService.getAll();
    return res.status(HttpStatus.OK).send(voucherCodes);
  }

  @Get('/:id')
  async getOne(
    @Param('id') id: string,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const voucherCodes = await this.voucherCodesService.getOne(id);
    if (voucherCodes) return res.status(HttpStatus.OK).send(voucherCodes);
    res.status(HttpStatus.NOT_FOUND).send();
  }

  @Patch('/:id')
  async updateOne(
    @Param('id') id: string,
    @Body() createVoucherCodeDto: CreateVoucherCodeDto,
    @Req() req: Request,
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
  async deleteOne(
    @Param('id') id: string,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    try {
      await this.voucherCodesService.remove(id);
      return res.status(HttpStatus.NO_CONTENT).send();
    } catch ({ errors }) {
      return res.status(HttpStatus.BAD_REQUEST).send(errors);
    }
  }
}
