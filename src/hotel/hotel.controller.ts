import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ZoneRequest } from '../core/models/zone-request';
import { ZoneEntity } from '../core/entity';
import { HotelService } from '../core/services/hotel/hotel.service';
import { EmployerService } from '../core/services/employer/employer.service';
import { RoomService } from '../core/services/room/room.service';
import { GuestService } from '../core/services/guest/guest.service';
import { WakeUpService } from '../core/services/wake-up/wake-up.service';

@Controller('hotel')
export class HotelController {
  constructor(
    private hotelService: HotelService,
    private employerService: EmployerService,
    private roomService: RoomService,
    private guestService: GuestService,
    private wakeService: WakeUpService,
  ) {}

  @Get('category')
  getCategories() {
    return this.hotelService.getCategories();
  }

  @Post(':id/zone')
  createZone(@Param() param: { id: string }, @Body() request: ZoneRequest) {
    return this.hotelService.createZone(param.id, request);
  }

  @Get(':id/zone')
  getZones(@Param() param: { id: string }) {
    return this.hotelService.getZonesByHotel(param.id);
  }

  @Get(':id/employer')
  getEmployees(@Param('id') id: string) {
    return this.employerService.getEmployees(id);
  }

  @Put('zone')
  updateZone(@Body() zone: ZoneEntity) {
    return this.hotelService.updateZone(zone);
  }

  @Delete('zone/:id')
  deleteZone(@Param('id') id: string) {
    return this.hotelService.deleteZone(id);
  }

  @Post(':id/room')
  createRoom(@Param('id') id: string, @Body('name') name: string) {
    return this.roomService.createRoom(name, id);
  }

  @Get(':id/guest')
  getGuest(@Param('id') id: string) {
    return this.guestService.getGuestByHotel(id);
  }

  @Get(':id/wake')
  getWake(@Param('id') id: string) {
    return this.wakeService.getWakeByHotel(id);
  }
}