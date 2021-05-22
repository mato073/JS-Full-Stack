import { Controller, Get, Post, Body, Param, Patch } from '@nestjs/common';
import { RoomService } from './room.service';

@Controller('room')
export class RoomController {
    constructor(private readonly room: RoomService) { }

    @Post()
    addRoom(@Body('name') name: string) {
        return this.room.postRoom(name);
    }

    @Get('rooms')
    getRooms() {
        return this.room.getRooms();
    }

    @Patch('start/:userId')
    async StartRoom(@Body('link') link: string) {
        
    }

    @Patch('stop/:userId')
    async StopRoom(@Body('link') link: string) {
        
    }

    @Patch('connect/:userId')
    connectRoom(@Body('link') link: string) {

    }

    /* @Get(':email')
     getUser(@Param('email') email: string) {
         return this.oauthService.getUser(email);
     }  */
}