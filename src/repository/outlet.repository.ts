import outlet, { IOutlet } from '../model/outlet.model'
import { Types } from 'mongoose'

class OutletRepository {
    async create(outletData: Partial<IOutlet>): Promise<IOutlet> {
        return await new outlet(outletData).save()
    }

    async update(outletId: string, updateData: Partial<IOutlet>): Promise<IOutlet | null> {
        return await outlet.findByIdAndUpdate(outletId, updateData, { new: true }).lean()
    }

    async delete(outletId: string): Promise<IOutlet | null> {
        return await outlet.findByIdAndDelete(outletId).lean()
    }

    async findById(outletId: string): Promise<IOutlet | null> {
        return await outlet.findById(outletId).populate('owner_id').lean()
    }

    async findAll(): Promise<IOutlet[]> {
        return await outlet.find().lean()
    }
}

export default new OutletRepository()
