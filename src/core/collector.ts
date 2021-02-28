const jsdom = require('jsdom')
const { jsdom: JSDOM } = jsdom
import { corsProxy } from './constants'
import axios from 'axios'
import { LogLevels, All } from './main'
import { logger } from './utils'
import { UrlsToQuery } from './parcer'

interface Collector {
  urlsToQuery: UrlsToQuery | null
  proxy: null | string
  logs: LogLevels
}

const collector = async ({
  urlsToQuery,
  proxy,
  logs
}: Collector): Promise<any> => {
  let data: Array<any> = []
  if (!urlsToQuery) {
    return data
  }
  for await (const o of urlsToQuery) {
    const fetchURL = proxy ? `${proxy}/${o.url}` : `${corsProxy}/${o.url}`
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
        message: 'Failed to fetch contributions urls...'
      })
    }
    const dom = new JSDOM(res.data)
    const candidates: Array<HTMLHeadElement> = Array.from(
      dom.querySelectorAll('h2')
    )
    const candidate: string = candidates.filter((c: any) =>
      c.innerHTML.toString().includes('contributions')
    )[0].innerHTML
    const cleanCandidate = candidate?.replace(/,/g, '')
    const temp = cleanCandidate.match(/\d+/)
    const amount = temp ? temp[0] : null
    const blob: All = {
      year: o.year,
      contributions: amount
    }
    data.push(blob)
  }
  return data
}

export default collector
