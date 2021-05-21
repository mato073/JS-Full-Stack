import {Module} from '@nestjs/common'
import {UserController} from './user.controller'
import { TypeOrmModule } from '@nestjs/typeorm';
import {OauthService} from './oauth.service'
import {Users} from './user.entity'

@Module( {
    imports: [
         TypeOrmModule.forFeature([Users]),
      ],
    controllers:[UserController],
    providers: [OauthService]
})
export class UserModule {
}