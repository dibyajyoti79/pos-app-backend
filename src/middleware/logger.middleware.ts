// import morgan, { StreamOptions } from 'morgan'
// import { reqResLogger } from '../logger/logger'

// const stream: StreamOptions = {
//     write: (message) => reqResLogger.info(message.trim())
// }

// const morganFormat = ':method :url :status :res[content-length] - :response-time ms'

// const requestLogger = morgan(morganFormat, { stream })

// export default requestLogger

import morgan, { StreamOptions } from 'morgan'
import { Request } from 'express'
import { reqResLogger } from '../logger/logger'

// Stream configuration to use the Winston logger
const stream: StreamOptions = {
    write: (message) => reqResLogger.info(message.trim())
}

// Add custom tokens to include detailed information
morgan.token('client-ip', (req: Request): string => {
    const forwardedFor = req.headers['x-forwarded-for']
    if (Array.isArray(forwardedFor)) {
        return forwardedFor[0] // If there are multiple IPs, take the first one
    }
    return req.ip || forwardedFor || req.socket.remoteAddress || '-' // Fallbacks if no IP found
})

morgan.token('request-body', (req: Request) => {
    return JSON.stringify(req.body) || '-'
})

// morgan.token('req-headers', (req: Request) => {
//     return JSON.stringify(req.headers) || '-'
// })

// morgan.token('response-body', (_: Request, res: Response) => {
//     const oldSend = res.send
//     const oldJson = res.json
//     let responseBody: unknown

//     res.send = function (...args: [body?: unknown]) {
//         responseBody = args[0]
//         return oldSend.apply(this, args)
//     }

//     res.json = function (...args: [body?: unknown]) {
//         responseBody = args[0]
//         return oldJson.apply(this, args)
//     }

//     return JSON.stringify(responseBody) || '-'
// })

// Define a detailed format string

const detailedMorganFormat = ':client-ip :method :url :status :res[content-length] - :response-time ms'

// Create the middleware with the detailed format
const requestLogger = morgan(detailedMorganFormat, { stream })

export default requestLogger

