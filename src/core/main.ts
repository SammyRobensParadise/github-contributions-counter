import scraper from './scraper'
import parcer from './parcer'
import { logger } from './utils'
import collector from './collector'
import format from './formatter'
export type LogLevels = 'error' | 'warning' | 'none'
export type Partitions = undefined | 'year' | 'all' | 'current'

export interface GetGithubContributions {
  username: string
  config?: {
    partition?: Partitions
    proxy?: undefined | string | null
    logs?: LogLevels
  }
}

export type All = {
  year: string | (string | null)[]
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
    return null
  }
  const urlsToQuery = parcer({
    webpage: webpage,
    partitions: config.partition,
    username: username
  })
  if (!urlsToQuery) {
    logger({
      logLevel: logLevels,
      message: `Contribution URLs could not be found. It is possible that Githubs DOM has changed. If you belive this to be the case open an issue at: https://github.com/SammyRobensParadise/github-contributions-counter`
    })
    return null
  }

  const rawData = await collector({
    urlsToQuery: urlsToQuery,
    proxy: requestProxy,
    logs: logLevels
  })
  if (!rawData) {
    logger({
      logLevel: logLevels,
      message: `Data returned is ${typeof rawData}. Expected non-empty array`
    })
    return null
  }

  const result = format({ rawData: rawData, partition: config.partition })
  if (!result) {
    logger({
      logLevel: logLevels,
      message: `Unable to parce data, got result of ${typeof result}`
    })
  }
  return result
}
