import { LogLevels, All } from './main';
import { UrlsToQuery } from './parcer';
interface Collector {
    urlsToQuery: UrlsToQuery | null;
    proxy: null | string;
    logs: LogLevels;
}
declare const collector: ({ urlsToQuery, proxy, logs }: Collector) => Promise<Array<All | null>>;
export default collector;
