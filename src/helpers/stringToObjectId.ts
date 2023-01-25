import { Types } from 'mongoose';

export const stringToObjectId = (id: string): Types.ObjectId => {
  return new Types.ObjectId(id);
};
