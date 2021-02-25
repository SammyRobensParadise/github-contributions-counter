import cheerio from 'cheerio'
interface Parce {
  webpage: string
}
const parce = ({ webpage }: Parce): cheerio.Cheerio => {
  const $ = cheerio.load(webpage)

  const DateSelectors = $("a[id*='year-link']")
  return DateSelectors
}
export default parce
