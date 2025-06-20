import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../../app.module';
import * as request from 'supertest';

describe('SpecialOffersController (e2e)', () => {
  let app: INestApplication;
  const mockupSpecialOffers = [
    {
      name: `offer number ${Math.floor(Math.random() * 10000)}`,
      discount: Math.floor(Math.random() * 99),
    },
    {
      name: `offer number ${Math.floor(Math.random() * 10000)}`,
      discount: Math.floor(Math.random() * 99),
    },
  ];

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  describe('/special_offer (POST)', () => {
    it('Create new special offer', async () => {
      await request(app.getHttpServer())
        .post('/special_offer')
        .send(mockupSpecialOffers[0])
        .expect(201)
        .expect(mockupSpecialOffers[0]);
    });
  });

  describe('/special_offer/:id (GET)', () => {
    it('Get special offer', async () => {
      await request(app.getHttpServer())
        .get('/special_offer/' + 2)
        .expect(200);
    });
  });

  describe('/special_offer/all (GET)', () => {
    it('Get all special offers', async () => {
      await request(app.getHttpServer()).get('/special_offer/all').expect(200);
    });
  });

  describe('/special_offer/:id (PATCH)', () => {
    it('Update special offer', async () => {
      await request(app.getHttpServer())
        .patch('/special_offer/1')
        .send(mockupSpecialOffers[1])
        .expect(202)
        .expect(mockupSpecialOffers[1]);
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
