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

  @SubscribeMessage('join')
  async JoinRoom(client: Socket, data: { room: string, user: { name: string, id: number } }) {
    client.userId = data.user.id;
    client.room = data.room
    client.join(data.room)
    const users = await this.roomService.getUserStatus(data.user, data.room);
    if (users.status === 201) {
      this.server.to(client.id).emit('mycolor', users.color)
    }
    this.server.to(data.room).emit('newPlayer', users.users)

  }

  @SubscribeMessage('possition')
  handleEvent(client: Socket, data: { room: string, position: object }): void {
    this.server.to(data.room).emit('possition', data.position)
  }

  @SubscribeMessage('newTurn')
  async handleTurn(client: Socket, data: { room: string, color: string }) {
    const result = await this.roomService.newTurn(data.room, data.color);
    if (result.status === 200) {
      console.log('ici');
      
      this.server.to(data.room).emit('newTurn', result.color);
    }
  }

  @SubscribeMessage('startGame')
  async StartRoom(client: Socket, data: { room: string }) {
    const result = await this.roomService.startFromSocket(data.room);
    if (result.status === 200) {
      this.server.to(data.room).emit('gameStart', 'started')
    }
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