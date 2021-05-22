import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { RoomService } from './room.service';

@Controller('room')
export class RoomController {
    constructor(private readonly room: RoomService ) { }

    @Post()
    addUser(@Body('name') name: string) {
        return this.room.postRoom(name);
    }
/* 
    @Get('login/:email/:password')
    login(@Param('email') email: string,  @Param('password') password: string) {

    }

    @Get(':email')
    getUser(@Param('email') email: string) {
        return this.oauthService.getUser(email);
    }  */
}