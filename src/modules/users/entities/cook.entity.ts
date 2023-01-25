import { OmitType } from '@nestjs/swagger';

import { User } from '../models/users.model';

export class CookEntity extends OmitType(User, [] as const) {
    
}
