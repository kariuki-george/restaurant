import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import {
  QUEUE_ALREADY_EXISTS,
  QUEUE_NOT_FOUND,
} from 'src/errors/errors.constants';
import { CreateQueueDto } from './dtos/createQueue.dto';
import { UpdateQueueDto } from './dtos/updateQueue.dto';
import { Queue } from './models/queues.model';

import { QueuesService } from './queues.service';

@ApiTags('Queues')
@Controller('queue')
export class QueuesController {
  constructor(private readonly queuesService: QueuesService) {}
  @Get()
  @ApiOkResponse({
    description: 'Returns all the Queues',
    isArray: true,
    type: Queue,
  })
  getQueue(): Promise<Queue[]> {
    return this.queuesService.getQueues();
  }

  @Get(':queueId')
  @ApiParam({
    name: 'queueId',

    required: true,
    type: String,
    allowEmptyValue: false,
  })
  @ApiOkResponse({
    description: 'Returns all the Queues',
    isArray: true,
    type: Queue,
  })
  getQueueById(@Param() param): Promise<Queue> {
    return this.queuesService.getQueueById(param.queueId);
  }

  @Post()
  @ApiCreatedResponse({
    description: 'Created a Queue successfully',
    type: Queue,
  })
  @ApiBadRequestResponse({
    description: QUEUE_ALREADY_EXISTS,
  })
  createQueue(@Body() Queue: CreateQueueDto): Promise<Queue> {
    return this.queuesService.createQueue(Queue);
  }

  @Put()
  @ApiNotFoundResponse({
    description: QUEUE_NOT_FOUND,
  })
  @ApiOkResponse({
    description: 'Queue updated successfully',
    type: Queue,
  })
  updateQueue(@Body() Queue: UpdateQueueDto): Promise<Queue> {
    return this.queuesService.updateQueue(Queue);
  }

  @Delete(':QueueId')
  @ApiOkResponse({
    description: 'Deletes a Queue',
    type: Boolean,
  })
  @ApiParam({
    name: 'queueQueueId',
    allowEmptyValue: false,
    description: 'Queue id',
    example: '123456789',
    required: true,
    type: String,
  })
  deleteQueue(@Param() params) {
    return this.queuesService.deleteQueue(params.QueueId);
  }
}
