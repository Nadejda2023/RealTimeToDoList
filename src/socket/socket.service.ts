import {
  OnGatewayConnection,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Task } from '@prisma/client';
import { Server } from 'socket.io';

@WebSocketGateway({ cors: { orgin: '*' } })
export class SocketService implements OnGatewayConnection {
  @WebSocketServer() server: Server;

  handleConnection(client: any) {
    console.log(client);
    console.log('CONECTED');
  }

  async handleTaskCreate(task: Task) {
    this.server.emit('taskCreate', task);
  }

  async handleTaskUpdates(task: Task) {
    this.server.emit('taskUpdated', task);
  }

  async handleTaskDelete(task: Task) {
    this.server.emit('taskCreate', task);
  }
}
