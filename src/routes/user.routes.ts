import { Router } from 'express'
import userController from '../controller/user.controller'

const router = Router()

router
    .route('/')
    .get(userController.getAllUsers) // Fetch all users
    .post(userController.addUser) // Add a new user

router
    .route('/:id')
    .put(userController.editUser) // Edit a user
    .delete(userController.deleteUser) // Delete a user

export default router
