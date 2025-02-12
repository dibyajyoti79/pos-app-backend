import User, { IUser } from '../model/user.model'

class UserRepository {
    async findAll(): Promise<IUser[]> {
        return User.find()
    }

    async create(userData: IUser): Promise<IUser> {
        const user = new User(userData)
        return user.save()
    }

    async update(userId: string, updatedData: Partial<IUser>): Promise<IUser | null> {
        return User.findByIdAndUpdate(userId, updatedData, { new: true })
    }

    async delete(userId: string): Promise<IUser | null> {
        return User.findByIdAndDelete(userId)
    }
}

export default new UserRepository()
