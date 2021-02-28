const jsdom = require('jsdom')
const { jsdom: JSDOM } = jsdom
import { githubRootURL } from './constants'

interface Parcer {
  webpage: string
}

export type UrlsToQuery = Array<{
  url: string
  year: string
}>

const parcer = ({ webpage }: Parcer): UrlsToQuery | null => {
  const dom = new JSDOM(webpage, { runScripts: 'dangerously' })
  const els: NodeListOf<HTMLAnchorElement> = dom.querySelectorAll(
    "a[id*='year-link']"
  )
  if (!els.length) {
    return null
  }
  const urls: UrlsToQuery = Array.from(els).map((e) => {
    return { url: `${githubRootURL}${e.href}`, year: e.innerHTML }
  })
  return urls
}
export default parcer
