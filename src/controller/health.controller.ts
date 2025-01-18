// controllers/healthController.ts
import { Request, Response } from 'express'
import { ApiResponse } from '../util/ApiResponse'
import responseMessage from '../constant/responseMessage'
import { asyncHandler } from '../util/asyncHandler'
import quicker from '../util/quicker'
// import { logger } from '../logger/logger'

export const self = asyncHandler((_: Request, res: Response) => {
    res.status(200).json(new ApiResponse(200, null, responseMessage.SUCCESS))
})

export const getHealth = asyncHandler((_: Request, res: Response) => {
    const healthData = {
        application: quicker.getApplicationHealth(),
        system: quicker.getSystemHealth(),
        timestamp: Date.now()
    }
    // logger.info(healthData)
    // logger.error('error')
    res.status(200).json(new ApiResponse(200, healthData, responseMessage.SUCCESS))
})

