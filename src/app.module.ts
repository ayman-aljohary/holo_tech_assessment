import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CustomersModule } from './components/customer/customers.module';
import { SpecialOffersModule } from './components/special_offer/special_offers.module';
import { VoucherCodesModule } from './components/voucher_code/voucher_codes.module';
import { ThrottlerModule } from '@nestjs/throttler';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: 'host.docker.internal',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'database_development',
      autoLoadModels: true,
      synchronize: true,
    }),
    ThrottlerModule.forRoot({
      throttlers: [
        {
          ttl: 60000,
          limit: 10,
        },
      ],
    }),
    CustomersModule,
    SpecialOffersModule,
    VoucherCodesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
