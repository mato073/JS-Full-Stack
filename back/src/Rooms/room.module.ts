import {Module} from '@nestjs/common'
import {RoomController} from './room.controller'
import { TypeOrmModule } from '@nestjs/typeorm';
import {RoomService} from './room.service'
import {Rooms} from './room.entity'

@Module( {
    imports: [
         TypeOrmModule.forFeature([Rooms]),
      ],
    controllers:[RoomController],
    providers: [RoomService]
})
export class RoomModule {
}