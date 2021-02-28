export declare type LogLevels = 'error' | 'warning' | 'none';
export declare type Partitions = undefined | 'year' | 'all' | 'current';
export interface GetGithubContributions {
    username: string;
    config?: {
        partition?: Partitions;
        proxy?: undefined | string | null;
        logs?: LogLevels;
    };
}
export declare type All = {
    year: string | (string | null)[];
    contributions: string | null;
};
export declare const getGithubContributions: ({ username, config }: GetGithubContributions) => Promise<Array<All> | any>;
