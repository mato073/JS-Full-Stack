import { Module } from '@nestjs/common'
import { RoomController } from './room.controller'
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoomService } from './room.service'
import { Rooms } from './room.entity'
import { JwtModule } from '@nestjs/jwt'
import {Users} from '../Oauth/user.entity'

@Module({
  imports: [
    TypeOrmModule.forFeature([Rooms, Users]),
    JwtModule.register({
      secret: 'Jdfrdf34deede',
      signOptions: { expiresIn: '90d' }
    }),
  ],
  controllers: [RoomController],
  providers: [RoomService]
})
export class RoomModule {
}