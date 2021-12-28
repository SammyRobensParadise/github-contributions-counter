import { AxiosResponse } from 'axios';
export interface GetGithubContributions {
    username: string;
    token: string;
}
export interface Response extends AxiosResponse {
    data: {
        data: {
            user: {
                name: string;
                contributionsCollection: {
                    contributionCalendar: {
                        colors: string[];
                        totalContributions: number;
                        weeks: {
                            firstDay: string;
                            contributionDays: Array<{
                                color: string;
                                contributionCount: number;
                                date: string;
                                weekday: number;
                            }>;
                        }[];
                    };
                };
            };
        };
    };
}
export declare const getGithubContributions: ({ username, token }: GetGithubContributions) => Promise<Response>;
