import { githubRootURL, corsProxy } from './constants'
import axios from 'axios'
import { LogLevels } from './main'
import { logger } from './utils'

interface Scraper {
  username: string
  proxy: null | string
  logs: LogLevels
}
const scraper = async ({ username, proxy, logs }: Scraper): Promise<string> => {
  const githubUrl = `${githubRootURL}/${username}`
  const fetchURL = proxy ? `${proxy}/${githubUrl}` : `${corsProxy}/${githubUrl}`
  const res = await axios({
    method: 'get',
    url: fetchURL,
    responseType: 'text',
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  })
  if (res.status !== 200) {
    logger({
      logLevel: logs,
      message: `Status code ${res.status.toString()}. This is likely a problem with the proxy or the u`
    })
  }
  return res.data
}

export default scraper
