import { Request, Response } from 'express'
import { ApiResponse } from '../util/ApiResponse'
import responseMessage from '../constant/responseMessage'
import { asyncHandler } from '../util/asyncHandler'
import userService from '../service/user.service'
import { IUser } from '../model/user.model' // Import IUser

const getAllUsers = asyncHandler(async (_: Request, res: Response) => {
    const users = await userService.getAllUsers()
    res.status(200).json(new ApiResponse(200, users, responseMessage.SUCCESS))
})

const addUser = asyncHandler(async (req: Request<object, object, IUser>, res: Response) => {
    const newUser = await userService.addUser(req.body)
    res.status(201).json(new ApiResponse(201, newUser, responseMessage.USER_CREATED))
})

const editUser = asyncHandler(async (req: Request<Record<string, string>, object, Partial<IUser>>, res: Response) => {
    const updatedUser = await userService.editUser(req.params.id, req.body)
    res.status(200).json(new ApiResponse(200, updatedUser, responseMessage.USER_UPDATED))
})

const deleteUser = asyncHandler(async (req: Request<Record<string, string>>, res: Response) => {
    const deletedUser = await userService.deleteUser(req.params.id)
    res.status(200).json(new ApiResponse(200, deletedUser, responseMessage.USER_DELETED))
})

// Export all functions in a default object
export default { getAllUsers, addUser, editUser, deleteUser }
