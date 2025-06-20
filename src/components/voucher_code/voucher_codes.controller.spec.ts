import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../../app.module';
import * as request from 'supertest';

describe('VoucherCodeController (e2e)', () => {
  let app: INestApplication;
  const mockupVoucherCodes = [
    {
      code: `ttt${Math.floor(Math.random() * 9999)}ttt`,
      customerId: Math.floor(Math.random() * 99),
      specialOfferId: Math.floor(Math.random() * 99),
      expirationDate: '2025-09-11',
      oneTimeUsage: true,
    },
    {
      code: `ttt${Math.floor(Math.random() * 9999)}ttt`,
      customerId: Math.floor(Math.random() * 99),
      specialOfferId: Math.floor(Math.random() * 99),
      expirationDate: '2025-09-11',
      oneTimeUsage: true,
    },
  ];

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  describe('/voucher_code (POST)', () => {
    it('Create new voucher code', async () => {
      await request(app.getHttpServer())
        .post('/voucher_code')
        .send(mockupVoucherCodes[0])
        .expect(201)
        .expect(mockupVoucherCodes[0]);
    });
  });

  describe('/voucher_code/:id (GET)', () => {
    it('Get voucher code', async () => {
      await request(app.getHttpServer()).get('/voucher_code/1').expect(200);
    });
  });

  describe('/voucher_code/all (GET)', () => {
    it('Get all voucher codes', async () => {
      await request(app.getHttpServer()).get('/voucher_code/all').expect(200);
    });
  });

  describe('/voucher_code/:id (PATCH)', () => {
    it('Update voucher code', async () => {
      await request(app.getHttpServer())
        .patch('/voucher_code/1')
        .send(mockupVoucherCodes[1])
        .expect(202)
        .expect(mockupVoucherCodes[1]);
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
