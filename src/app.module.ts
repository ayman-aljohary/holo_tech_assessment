import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CustomersModule } from './components/customer/customers.module';
import { SpecialOffersModule } from './components/special_offer/special_offers.module';
import { VoucherCodesModule } from './components/voucher_code/voucher_codes.module';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'database_development',
      autoLoadModels: true,
      synchronize: true,
    }),
    CustomersModule,
    SpecialOffersModule,
    VoucherCodesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
