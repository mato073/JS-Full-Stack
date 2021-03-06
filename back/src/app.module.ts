import { Module } from '@nestjs/common';

import { AppController } from './app.controller';

import { AppService } from './app.service';

import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';

import { UserModule } from './Oauth/user.module'
import { RoomModule } from './Rooms/room.module'
import config from '../ormconfig'

@Module({
  imports: [
    TypeOrmModule.forRoot(config),
    UserModule,
    RoomModule,
  ],
  controllers: [
    AppController,
  ],
  providers: [
    AppService,
  ],
})
export class AppModule {
  constructor(private connection: Connection) { }
}
