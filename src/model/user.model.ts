import mongoose, { Schema, CallbackError } from 'mongoose'
import bcrypt from 'bcrypt'

export interface IUser {
    name: string
    email: string
    mobile: string
    password: string
    role: 'admin' | 'user'
    _id?: mongoose.ObjectId
}

const userSchema: Schema<IUser> = new Schema(
    {
        name: { type: String, required: [true, 'Name is required'] },
        email: { type: String, required: true },
        mobile: { type: String, required: true },
        password: { type: String, required: true },
        role: { type: String, required: true, enum: ['admin', 'user'] }
    },
    { timestamps: true }
)

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next()
    try {
        const salt = await bcrypt.genSalt(10)
        this.password = await bcrypt.hash(this.password, salt)
        next()
    } catch (error) {
        next(error as CallbackError)
    }
})

userSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
    return await bcrypt.compare(candidatePassword, this.password)
}

const user = mongoose.model<IUser>('User', userSchema)

export default user

