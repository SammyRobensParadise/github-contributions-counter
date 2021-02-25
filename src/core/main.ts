import scraper from './scraper'
export type LogLevels = 'error' | 'warning' | 'none'
export interface GetGithubContributions {
  username: string
  config?: {
    partition?: undefined | 'year' | 'all'
    proxy?: undefined | string | null
    logs?: LogLevels
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
  const logLevels = config?.logs ? config.logs : 'none'

  const webpage = await scraper({
    username: username,
    proxy: requestProxy,
    logs: logLevels
  })
  return webpage
}
