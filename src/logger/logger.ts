import winston, { format, Logger, Logform } from 'winston'
import 'winston-daily-rotate-file'

interface ICustomLogFormat extends Logform.TransformableInfo {
    level: string
    message: string
    timestamp?: string
}

// Application Logs
const appLogFormat = format.printf((info) => {
    const { level, message, timestamp } = info as ICustomLogFormat
    return `[${timestamp}] ${level.toUpperCase()}: ${JSON.stringify(message)}`
})

const appLogger: Logger = winston.createLogger({
    level: 'info',
    format: format.combine(format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), appLogFormat),
    transports: [
        new winston.transports.DailyRotateFile({
            dirname: 'logs/application',
            filename: 'app-%DATE%.log',
            datePattern: 'YYYY-MM-DD',
            zippedArchive: true,
            maxSize: '20m',
            maxFiles: '14d'
        }),
        new winston.transports.Console() // Optional for console logs
    ]
})

// Request/Response Logs
const reqResLogFormat = format.printf((info) => {
    const { message } = info as ICustomLogFormat
    return message
})

const reqResLogger: Logger = winston.createLogger({
    level: 'info',
    format: reqResLogFormat,
    transports: [
        new winston.transports.DailyRotateFile({
            dirname: 'logs/access',
            filename: 'access-%DATE%.log',
            datePattern: 'YYYY-MM-DD',
            zippedArchive: true,
            maxFiles: '7d'
        })
    ]
})

export { appLogger as logger, reqResLogger }

