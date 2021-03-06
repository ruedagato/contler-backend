import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HotelModule } from './hotel/hotel.module';
import { EmployerModule } from './employer/employer.module';
import { RoomModule } from './room/room.module';
import { GuestModule } from './guest/guest.module';
import { WakeUpModule } from './wake-up/wake-up.module';
import { RequestModule } from './request/request.module';
import { ReservationModule } from './reservation/reservation.module';
import { ScheduleModule } from '@nestjs/schedule';
import { ProductModule } from './product/product.module';
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({
  path: path.resolve(__dirname, '../.env'),
});

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      extra: {
        ssl: true,
      },
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
      // logging: true,
    }),
    HotelModule,
    EmployerModule,
    RoomModule,
    GuestModule,
    WakeUpModule,
    RequestModule,
    ReservationModule,
    ScheduleModule.forRoot(),
    ProductModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
