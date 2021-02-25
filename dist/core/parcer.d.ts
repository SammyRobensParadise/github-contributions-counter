import cheerio from 'cheerio';
interface Parce {
    webpage: string;
}
declare const parce: ({ webpage }: Parce) => cheerio.Cheerio;
export default parce;
