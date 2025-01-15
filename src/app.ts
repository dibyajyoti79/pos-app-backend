import express, { Application, NextFunction, Request, Response } from 'express'
import path from 'path'
import healthRoute from './router/health.route'
import responseMessage from './constant/responseMessage'
import helmet from 'helmet'
import cors from 'cors'
import { ApiError } from './util/ApiError'
import { errorMiddleware } from './middleware/error.middleware'

const app: Application = express()

// Middlewares
app.use(helmet())
app.use(
    cors({
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'HEAD'],
        origin: '*',
        credentials: true
    })
)
app.use(express.json())
app.use(express.static(path.join(__dirname, '../', 'public')))

// Routes
app.use('/api/v1/', healthRoute)

// 404 Handler
// eslint-disable-next-line @typescript-eslint/naming-convention
app.use((_: Request, __: Response, next: NextFunction) => {
    try {
        throw new ApiError(404, responseMessage.NOT_FOUND('route'))
    } catch (err) {
        next(err)
    }
})

// Global Error Handler
app.use(errorMiddleware)

export default app

