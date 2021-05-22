import { Controller, Get, Post, Body, Param, Patch } from '@nestjs/common';
import { RoomService } from './room.service';

@Controller('room')
export class RoomController {
    constructor(private readonly room: RoomService) { }

    @Post(':token')
    addRoom(@Body('name') name: string, @Param('token') token: string) {
        return this.room.postRoom(name, token);
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

    @Patch('join/:token')
    async  joinRoom(@Body('link') link: string,  @Param('token') token: string) {
        return this.room.joinRooms(link, token);
    }

    /* @Get(':email')
     getUser(@Param('email') email: string) {
         return this.oauthService.getUser(email);
     }  */
}