import scraper from './scraper'
import parcer from './parcer'
import { logger } from './utils'
import collector from './collector'
export type LogLevels = 'error' | 'warning' | 'none'
export interface GetGithubContributions {
  username: string
  config?: {
    partition?: undefined | 'year' | 'all'
    proxy?: undefined | string | null
    logs?: LogLevels
  }
}

export type All = {
  year: string
  contributions: string | null
}

export const getGithubContributions = async ({
  username,
  config = {
    partition: 'all',
    proxy: null,
    logs: 'none'
  }
}: GetGithubContributions): Promise<Array<All> | any> => {
  if (!username) {
    throw new Error('You must provide a github username')
  }
  const requestProxy = config?.proxy ? config.proxy : null
  const logLevels = config?.logs ? config.logs : 'none'

  const webpage: string = await scraper({
    username: username,
    proxy: requestProxy,
    logs: logLevels
  })
  if (!webpage) {
    logger({
      logLevel: logLevels,
      message:
        'A Github profile could not be fetched. There are likely errors above'
    })
  }
  const urlsToQuery = parcer({ webpage: webpage })
  if (!urlsToQuery) {
    logger({
      logLevel: logLevels,
      message: `Contribution URLs could not be found. It is possible that Githubs DOM has changed. If you belive this to be the case open an issue at: https://github.com/SammyRobensParadise/github-contributions-counter`
    })
  }

  const rawData = await collector({
    urlsToQuery: urlsToQuery,
    proxy: requestProxy,
    logs: logLevels
  })
  return rawData
}
