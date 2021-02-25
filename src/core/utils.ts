import { LogLevels } from './main'

interface Logger {
  logLevel: LogLevels
  message: string
}
const logger = ({
  logLevel = 'warning',
  message = 'An unknown Error Occured'
}: Logger): void => {
  switch (logLevel) {
    case 'warning':
      console.warn(message)
      break
    case 'error':
      throw new Error(message)
    case 'none' || undefined:
      break
    default:
      break
  }
}

export { logger }
