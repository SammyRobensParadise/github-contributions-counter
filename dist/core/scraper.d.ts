import { LogLevels } from './main';
interface Scraper {
    username: string;
    proxy: null | string;
    logs: LogLevels;
}
declare const scraper: ({ username, proxy, logs }: Scraper) => Promise<string>;
export default scraper;
