import scraper from './scraper'
export interface GetGithubContributions {
  username: string
  config?: {
    partition?: undefined | 'year' | 'all'
    proxy?: undefined | string | null
    logs?: 'error' | 'warning' | 'none'
  }
}

export const getGithubContributions = async ({
  username,
  config = {
    partition: 'all',
    proxy: null,
    logs: 'none'
  }
}: GetGithubContributions): Promise<any> => {
  if (!username) {
    throw new Error('You must provide a github username')
  }
  const requestProxy = config?.proxy ? config.proxy : null
  const webpage = await scraper({ username: username, proxy: requestProxy })
  return webpage
}
