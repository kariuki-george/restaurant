import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { CreateQueueDto } from './createQueue.dto';

export class UpdateQueueDto extends PartialType(CreateQueueDto) {
  @IsString()
  @ApiProperty()
  queueId: string;
}
