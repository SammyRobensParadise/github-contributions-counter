import { LogLevels } from './main';
interface Logger {
    logLevel: LogLevels;
    message: string;
}
declare const logger: ({ logLevel, message }: Logger) => void;
export { logger };
