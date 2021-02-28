import { All, Partitions } from './main';
interface Format {
    rawData: Array<All | null>;
    partition: Partitions;
}
declare const format: ({ rawData, partition }: Format) => (All | null)[] | {
    contributions: string | null;
    year: (string | (string | null)[] | undefined)[] | null;
}[] | null;
export default format;
