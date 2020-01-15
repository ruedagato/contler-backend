import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { GuestService } from '../core/services/guest/guest.service';
import { GuestRequest } from '../core/models/guest-request';
import { GuestEntity } from '../core/entity/guest.entity';
import { WakeUpService } from '../core/services/wake-up/wake-up.service';

@Controller('guest')
export class GuestController {
  constructor(private guestService: GuestService, private wakeService: WakeUpService) {}

  @Post()
  createGuest(@Body() request: GuestRequest) {
    return this.guestService.createGuest(request);
  }

  @Put()
  updateGuest(@Body() request: GuestEntity) {
    return this.guestService.updateGuest(request);
  }

  @Delete(':id')
  deleteGuest(@Param('id') id: string) {
    return this.guestService.disableGuest(id);
  }

  @Get(':id')
  getGuest(@Param('id') id: string) {
    return this.guestService.getGuest(id);
  }

  @Get(':id/wake-up')
  getWakeUp(@Param('id') id: string) {
    return this.wakeService.getWakeByGuest(id);
  }
}