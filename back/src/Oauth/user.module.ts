import {Module} from '@nestjs/common'
import {UserController} from './user.controller'
import { TypeOrmModule } from '@nestjs/typeorm';
import {OauthService} from './oauth.service'
import {Users} from './user.entity'
import {JwtModule} from '@nestjs/jwt'

@Module( {
    imports: [
         TypeOrmModule.forFeature([Users]),
         JwtModule.register({
           secret: 'Jdfrdf34deede',
           signOptions: {expiresIn: '90d'}
         })
      ],
    controllers:[UserController],
    providers: [OauthService]
})
export class UserModule {
}