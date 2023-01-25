import { Configuration } from './config.interface';

const int = (val: string | undefined, num: number): number =>
  val ? (isNaN(parseInt(val)) ? num : parseInt(val)) : num;
const bool = (val: string | undefined, bool: boolean): boolean =>
  val == null ? bool : val == 'true';

export default (): Configuration => ({
  PORT: int(process.env.PORT, 3000),
  MONGODB_URI:
    process.env.MONGODB_URI ?? 'mongodb://localhost:27017/restaurant',
});
