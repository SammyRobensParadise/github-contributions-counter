import { All, Partitions } from './main';
interface Format {
    rawData: Array<All | null>;
    partition: Partitions;
}
declare const format: ({ rawData, partition }: Format) => any[] | null;
export default format;
