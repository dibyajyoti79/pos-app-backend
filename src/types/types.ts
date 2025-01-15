export interface IHTTPError extends Error {
    statusCode?: number
    data?: unknown
}

export interface IHTTPResponse {
    statusCode: number
    success: boolean
    message: string
    data: unknown
    error?: unknown
}

