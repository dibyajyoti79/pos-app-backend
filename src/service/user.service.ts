import userRepository from '../repository/user.repository'
import { IUser } from '../model/user.model'

class UserService {
    async getAllUsers(): Promise<IUser[]> {
        return userRepository.findAll()
    }

    async addUser(userData: IUser): Promise<IUser> {
        return userRepository.create(userData)
    }

    async editUser(userId: string, updatedData: Partial<IUser>): Promise<IUser | null> {
        return userRepository.update(userId, updatedData)
    }

    async deleteUser(userId: string): Promise<IUser | null> {
        return userRepository.delete(userId)
    }
}

export default new UserService()
