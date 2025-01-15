import responseMessage from '../constant/responseMessage'

class ApiResponse<T> {
    public statusCode: number
    public success: boolean
    public message: string
    public data: T

    constructor(statusCode: number, data: T, message: string = responseMessage.SUCCESS) {
        this.statusCode = statusCode
        this.success = statusCode < 400
        this.message = message
        this.data = data
    }
}

export { ApiResponse }

