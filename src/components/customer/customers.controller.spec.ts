import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../../app.module';
import * as request from 'supertest';

describe('CustomersController (e2e)', () => {
  let app: INestApplication;
  const mockupCustomers = [
    {
      email: `e2etest${Math.floor(Math.random() * 10000)}@user.com`,
      name: 'e2e',
    },
    {
      email: `e2etest${Math.floor(Math.random() * 10000)}@user.com`,
      name: 'e2e',
    },
  ];

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  describe('/customer (POST)', () => {
    it('Create new customer', async () => {
      await request(app.getHttpServer())
        .post('/customer')
        .send(mockupCustomers[0])
        .expect(201)
        .expect(mockupCustomers[0]);
    });
  });

  describe('/customer/:id (GET)', () => {
    it('Get customer information', async () => {
      await request(app.getHttpServer())
        .get('/customer/' + 1)
        .expect(200);
    });
  });

  describe('/customer/all (GET)', () => {
    it('Get all customers information', async () => {
      await request(app.getHttpServer()).get('/customer/all').expect(200);
    });
  });

  describe('/customer/:id (PATCH)', () => {
    it('Update customer information', async () => {
      await request(app.getHttpServer())
        .patch('/customer/1')
        .send(mockupCustomers[1])
        .expect(202)
        .expect(mockupCustomers[1]);
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
