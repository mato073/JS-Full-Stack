import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { OauthService } from './oauth.service';

@Controller('user')
export class UserController {
    constructor(private readonly oauthService: OauthService) { }

    @Post('rigister')
    addUser(@Body('name') name: string, @Body('email') email: string, @Body('password') password: string){
        return this.oauthService.postUser(name, email, password);
    }

    @Post('login')
    async login(@Body('email') email: string, @Body('password') password: string) {
        return await this.oauthService.login(email, password);
    }

    @Get(':email')
    getUser(@Param('email') email: string) {
        return this.oauthService.getUser(email);
    }
}