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
import { CustomersService } from './customers.service';
import { CreateCustomerDto } from '../../../dtos/CreateCustomerDto';
import { ApiBody } from '@nestjs/swagger';

@Controller('customer')
export class CustomersController {
  constructor(private customersService: CustomersService) {}
  @Post()
  @ApiBody({
    type: CreateCustomerDto,
    description: 'Json structure for customer object',
  })
  @UsePipes(new ValidationPipe({ transform: true }))
  async create(
    @Body() createCustomerDto: CreateCustomerDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    try {
      await this.customersService.save(createCustomerDto);
      return res.status(HttpStatus.CREATED).send(createCustomerDto);
    } catch (errors) {
      return res.status(HttpStatus.BAD_REQUEST).send(errors);
    }
  }

  @Get('/all')
  async getAll(@Req() req: Request, @Res() res: Response) {
    const customers = await this.customersService.getAll();
    return res.status(HttpStatus.OK).send(customers);
  }

  @Get('/:id')
  async getOne(
    @Param('id') id: string,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const customers = await this.customersService.getOne(id);
    if (customers) return res.status(HttpStatus.OK).send(customers);
    res.status(HttpStatus.NOT_FOUND).send();
  }

  @Patch('/:id')
  async updateOne(
    @Param('id') id: string,
    @Body() createCustomerDto: CreateCustomerDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    try {
      await this.customersService.updateOne(id, createCustomerDto);
      return res.status(HttpStatus.ACCEPTED).send(createCustomerDto);
    } catch (errors) {
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
      await this.customersService.remove(id);
      return res.status(HttpStatus.NO_CONTENT).send();
    } catch (errors) {
      return res.status(HttpStatus.BAD_REQUEST).send(errors);
    }
  }
}
