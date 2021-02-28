interface Parcer {
    webpage: string;
}
export declare type UrlsToQuery = Array<{
    url: string;
    year: string;
}>;
declare const parcer: ({ webpage }: Parcer) => UrlsToQuery | null;
export default parcer;
