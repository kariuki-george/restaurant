import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Queue, QueueSchema } from './models/queues.model';
import { QueuesRepo } from './repos/queues.repo';
import { QueuesService } from './queues.service';
import { QueuesController } from './queues.controller';

@Module({
  providers: [QueuesService, QueuesRepo],
  controllers: [QueuesController],
  imports: [
    MongooseModule.forFeature([{ name: Queue.name, schema: QueueSchema }]),
  ],
  exports: [QueuesService],
})
export class QueuesModule {}
