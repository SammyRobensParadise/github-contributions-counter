import { githubRootURL, corsProxy } from './constants'
import axios from 'axios'

interface Scraper {
  username: string
  proxy: null | string
}
const scraper = async ({ username, proxy }: Scraper): Promise<any> => {
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
    throw new Error(
      `${
        res.statusText
      }: Status code ${res.status.toString()}. This is likely a problem with the proxy or the url`
    )
  }
  return res.data
}

export default scraper
