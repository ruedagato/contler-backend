import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { HotelEntity, RequestEntity, ZoneEntity } from '../../entity';
import { getConnection, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ZoneRequest } from '../../models/zone-request';
import { CategoryEntity } from '../../entity/category.entity';

@Injectable()
export class HotelService {
  constructor(
    @InjectRepository(HotelEntity) private hotelRepository: Repository<HotelEntity>,
    @InjectRepository(ZoneEntity) private zoneRepository: Repository<ZoneEntity>,
    @InjectRepository(CategoryEntity) private categoryRepository: Repository<CategoryEntity>,
  ) {}

  createHotel(name: string, logo: string) {
    const hotel = this.hotelRepository.create();
    hotel.name = name;
    hotel.logo = logo;
    return this.hotelRepository.save(hotel);
  }

  getHotel(hotelId: string) {
    return this.hotelRepository.findOne({ uid: hotelId });
  }

  async createZone(hotelId: string, request: ZoneRequest) {
    const hotel = await this.hotelRepository.findOne({ uid: hotelId });
    const zone = this.zoneRepository.create();
    zone.principal = request.principal;
    zone.name = request.name;
    zone.icon = request.icon;
    zone.hotel = hotel;
    zone.category = request.category;
    return this.zoneRepository.save(zone);
  }

  getCategories() {
    return this.categoryRepository.find();
  }

  async getZonesByHotel(hotelId: string) {
    const hotel = await this.hotelRepository.findOne({ uid: hotelId });
    return this.zoneRepository.find({ where: { hotel }, relations: ['category', 'leaders'] });
  }

  getZonesByIds(ids: string[]) {
    return this.zoneRepository.findByIds(ids);
  }

  updateZone(zone: ZoneEntity) {
    return this.zoneRepository.save(zone);
  }

  async deleteZone(zoneId: string) {
    const zone = await this.zoneRepository.findOne({ uid: zoneId }, { relations: ['leaders'] });
    if (zone.leaders.length > 0) {
      throw new HttpException('Esta zona tiene lideres asociados', HttpStatus.BAD_REQUEST);
    }
    return this.zoneRepository.delete({ uid: zoneId });
  }

  getScoreStatistic(hotelId) {
    return getConnection()
      .createEntityManager()
      .query('select avg(score), count(*) from request where request.score notnull and request."hotelUid" = $1', [
        hotelId,
      ]);
  }

  async getTimeStatistic(hotelId) {
    const data = await getConnection()
      .createQueryBuilder(RequestEntity, 'request')
      .select('avg("finishAt" - "createAt")', 'avg')
      .where('request."finishAt"  notnull')
      .andWhere('request."hotelUid" =  :id', {id: hotelId})
      .getRawOne();
    return data.avg;
  }
}
