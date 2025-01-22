import { NextFunction, Request, Response } from 'express'
import { IHTTPError, IHTTPResponse } from '../types/types'
import config from '../config/config'
import { EApplicationEnvironment } from '../constant/application'

// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/no-unused-vars
const errorMiddleware = (err: IHTTPError, _: Request, res: Response, __: NextFunction) => {
    err.message ||= 'Internal Server Error'
    err.statusCode ||= 500

    if (err.statusCode >= 500) {
        // Logging logic here
    }

    const response: IHTTPResponse = {
        statusCode: err.statusCode,
        success: false,
        message: err.message,
        data: err.data || null
    }

    if (config.ENV === EApplicationEnvironment.DEVELOPMENT) {
        response.error = err.stack
    }

    res.status(err.statusCode).json(response)
}

export { errorMiddleware }

