import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { OauthService } from './oauth.service';

@Controller('user')
export class UserController {
    constructor(private readonly oauthService: OauthService) { }

    @Post('rigister')
    addUser(@Body('name') name: string, @Body('email') email: string, @Body('password') password: string): object {
        return this.oauthService.postUser(name, email, password);
    }

    @Get('login/:email/:password')
    login(@Param('email') email: string,  @Param('password') password: string) {

    }

    @Get(':email')
    getUser(@Param('email') email: string) {
        return this.oauthService.getUser(email);
    }
}