import jsdom from 'jsdom'
const { JSDOM } = jsdom
interface Parce {
  webpage: string
}
const parce = ({ webpage }: Parce): NodeListOf<Element> => {
  const dom = new JSDOM(webpage)
  const urls = dom.window.document.querySelectorAll("a[id*='year-link']")
  console.log(urls)
  return urls
}
export default parce
