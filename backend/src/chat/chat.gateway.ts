import {MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer} from '@nestjs/websockets';

@WebSocketGateway({cors: true})
export class ChatGateway {

  @WebSocketServer()
  server

  // TODO Принимаю не string
  @SubscribeMessage('message')
  handleMessage(@MessageBody() message: string): void {
    this.server.emit('message', message)
  }
}
