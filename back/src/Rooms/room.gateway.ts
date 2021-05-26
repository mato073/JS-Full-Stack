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


  @SubscribeMessage('msgToServer')
  handleEvent(@MessageBody() data: string): void {
    this.logger.log('data =', data);
    this.server.emit('msgToClient', data)
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`Client connected: ${client.id}`);
  }
}