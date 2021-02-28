import { All, Partitions } from './main'

interface Format {
  rawData: Array<All | null>
  partition: Partitions
}

const format = ({ rawData, partition }: Format) => {
  let formattedData
  const data = rawData
  switch (partition) {
    case 'year': {
      formattedData = data
      break
    }
    case 'current': {
      formattedData = data
    }
    case 'all': {
      const years = data.map((e) => {
        return e?.year
      })
      const contribs: Array<number> = data.map((e): any => {
        if (typeof e?.contributions === 'string') {
          return parseInt(e?.contributions)
        }
      })
      const totalContribs = contribs.reduce((a, b) => a + b, 0)?.toString()

      const blob = [
        {
          contributions: totalContribs ? totalContribs : null,
          year: years ? years : null
        }
      ]
      formattedData = blob ? blob : null
      break
    }
    default: {
      formattedData = data
      break
    }
  }
  return formattedData
}

export default format
