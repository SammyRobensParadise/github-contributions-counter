const jsdom = require('jsdom')
const { jsdom: JSDOM } = jsdom

interface Parcer {
  webpage: string
}
const parcer = ({ webpage }: Parcer): any => {
  const dom = new JSDOM(webpage, { runScripts: 'dangerously' })
  const urls = dom.querySelectorAll("a[id*='year-link']")
  console.log(urls)
  return urls
}
export default parcer
