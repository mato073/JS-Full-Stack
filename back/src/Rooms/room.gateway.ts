import { SubscribeMessage, WebSocketGateway, WebSocketServer, MessageBody } from '@nestjs/websockets';
import { Inject } from '@nestjs/common';
import { Logger } from '@nestjs/common'
import { Socket, Server } from 'socket.io';
import { RoomService } from './room.service'

@WebSocketGateway()
export class RoomGateway {

  @Inject()
  private roomService: RoomService

  @WebSocketServer()
  server: Server;

  private logger: Logger = new Logger('RoomGateway')

  afterInit(server: any) {
    this.logger.log('Initialized')
  }


  @SubscribeMessage('possition')
  handleEvent(client: Socket, data: { room: string, possition: object }): void {
    this.server.to(data.room).emit('possition', data.possition)
  }

  @SubscribeMessage('join')
  async JoinRoom(client: Socket, data: { room: string, user: { name: string, id: number } }) {
    client.userId = data.user.id;
    client.room = data.room
    client.join(data.room)

    const users = await this.roomService.getUserStatus(data.user, data.room);
    this.server.to(data.room).emit('newPlayer', users.users)
  }

  async handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.userId}`);
    const users = await this.roomService.playerDisconect(client.userId, client.room)
    this.server.to(client.room).emit('newPlayer', users.users);
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`Client connected: ${client.id}`);
  }
}