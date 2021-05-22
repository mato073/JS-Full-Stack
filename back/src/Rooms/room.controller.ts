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

    @Patch('start/:token')
    async StartRoom(@Body('link') link: string, @Param('token') token: string) {
        return this.room.StartRooms(link, token)
    }

    @Patch('stop/:token')
    async StopRoom(@Body('link') link: string, @Param('token') token: string) {
        return this.room.StopRooms(link, token);
    }

    @Patch('join/:token')
    async joinRoom(@Body('link') link: string, @Param('token') token: string) {
        return this.room.joinRooms(link, token);
    }
}