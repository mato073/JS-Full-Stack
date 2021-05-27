import { SubscribeMessage, WebSocketGateway, WebSocketServer, MessageBody } from '@nestjs/websockets';
import { Logger } from '@nestjs/common'
import { Socket, Server } from 'socket.io';

@WebSocketGateway()
export class RoomGateway {
  @WebSocketServer()
  server: Server;

  private logger: Logger = new Logger('RoomGateway')

  afterInit(server: any) {
    this.logger.log('Initialized')
  }


  @SubscribeMessage('possition')
  handleEvent(@MessageBody() data: string): void {
    this.server.emit('possition', data)
  }

  @SubscribeMessage('join')
  JoinRoom(client: Socket, data: { room: string, userName: string}): void {
    this.logger.log(`Client join the room ${data.userName}`)
    /* this.server.emit('newJoin', data) */
  }

  @SubscribeMessage('newPlayer')
  handNewPlayer(@MessageBody() data: string): void {
    this.server.emit('newPlayer', data)
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`Client connected: ${client.id}`);
  }
}