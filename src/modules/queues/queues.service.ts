import {
  BadRequestException,
  CACHE_MANAGER,
  Inject,
  Injectable,
} from '@nestjs/common';
import { Cache } from 'cache-manager';
import { QUEUE_ALREADY_EXISTS } from 'src/errors/errors.constants';
import { stringToObjectId } from 'src/helpers/stringToObjectId';
import { CreateQueueDto } from './dtos/createQueue.dto';
import { UpdateQueueDto } from './dtos/updateQueue.dto';
import { Queue } from './models/queues.model';

import { QueuesRepo } from './repos/queues.repo';

@Injectable()
export class QueuesService {
  constructor(
    private readonly queuesRepo: QueuesRepo,
    @Inject(CACHE_MANAGER) private readonly cacheService: Cache,
  ) {}

  getQueues(filter?: Partial<Queue>) {
    return this.queuesRepo.find({ filter });
  }

  getQueueById(queueId: string): Promise<Queue> {
    return this.queuesRepo.findOne({ _id: queueId });
  }

  async createQueue(queue: CreateQueueDto): Promise<Queue> {
    try {
      await this.cacheService.del('queuesAssignment');

      return await this.queuesRepo.create({
        ...queue,
        cookId: stringToObjectId(queue.cookId),
        queueOrders: [],
      });
    } catch (error) {
      if (error.message.startsWith('E11000 duplicate key error collection')) {
        throw new BadRequestException(QUEUE_ALREADY_EXISTS);
      }
    }
  }

  async updateQueue(queue: UpdateQueueDto): Promise<Queue> {
    return this.queuesRepo.findOneAndUpdate({ _id: queue.queueId }, queue);
  }

  deleteQueue(queueId: string): Promise<Boolean> {
    return this.queuesRepo.deleteOne({ _id: queueId });
  }

  async assignQueue(orderId: string): Promise<string> {
    // Store queues in cache
    // Roundrobin algo
    // interface q {
    //   queues: string[];
    //   prevQueue: number;
    // }

    // let data: q = await this.cacheService.get('queuesAssignment');

    // if (!data) {
    //   data = {
    //     prevQueue: -1,
    //     queues: [],
    //   };
    //   const queues = await this.getQueues();
    //   queues.forEach((queue) => data.queues.push(queue._id.toString()));
    // }

    // data.prevQueue += 1;

    // if (data.queues.length === 0) {
    //   throw new BadRequestException('No queues available');
    // }

    // if (data.queues.length === data.prevQueue) {
    //   data.prevQueue = 0;
    // }

    // await this.cacheService.set('queuesAssignment', data);

    // save to queue
    // saves to queue with least number of queues
    const queues = await this.getQueues();

    if (queues.length === 0) {
      throw new BadRequestException('No queues available');
    }

    let min = queues[0].queueOrders.length;
    let queue = queues[0];
    let index = 0;

    while (index < queues.length) {
      let queueLength = queues[index].queueOrders.length;
      if (queueLength < min) {
        min = queueLength;
        queue = queues[index];
      }
      index++;
    }

    queue.queueOrders.push({
      admittedAt: new Date(),
      orderId: stringToObjectId(orderId),
    });

    await this.queuesRepo.findOneAndUpdate({ _id: queue._id }, { $set: queue });

    return queue._id.toString();
  }
}
