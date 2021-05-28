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
  handleEvent(client: Socket, data: { room: string, position: object }): void {
    this.server.to(data.room).emit('possition', data.position)
  }

  @SubscribeMessage('newTurn')
  handleTurn(client: Socket, data: { room: string, color: string }): void {
    const colors = ['red', 'purple', 'blue', 'green', 'yellow', 'orange']
    const index = colors.findIndex((el: string) => el === data.color);
    if (index === 5) {
      this.server.to(data.room).emit('newTurn', colors[0])
      this.roomService.newTurn(data.room, colors[0])
    } else {
      this.server.to(data.room).emit('newTurn', colors[index + 1])
      this.roomService.newTurn(data.room, colors[index + 1])
    }
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