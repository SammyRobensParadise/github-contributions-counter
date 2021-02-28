import { Partitions } from './main';
interface Parcer {
    webpage: string;
    partitions: Partitions;
    username: string;
}
export declare type UrlsToQuery = Array<{
    url: string;
    year: string;
}>;
declare const parcer: ({ webpage, partitions, username }: Parcer) => UrlsToQuery | null;
export default parcer;
