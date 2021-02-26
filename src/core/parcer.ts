import { parse as parcer } from 'himalaya'

interface Parce {
  webpage: string
}
const parce = ({ webpage }: Parce): cheerio.Cheerio => {
  console.log(webpage)
  const DateSelectors = parcer(webpage)
  return DateSelectors
}
export default parce
