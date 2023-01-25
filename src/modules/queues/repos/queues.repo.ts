import { Injectable, Logger } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { AbstractRepository } from 'src/providers/database/database.repository';
import { Queue } from '../models/queues.model';

@Injectable()
export class QueuesRepo extends AbstractRepository<Queue> {
  protected readonly logger = new Logger(QueuesRepo.name);

  constructor(
    @InjectModel(Queue.name) QueueModel: Model<Queue>,
    @InjectConnection() connection: Connection,
  ) {
    super(QueueModel, connection);
  }
}
