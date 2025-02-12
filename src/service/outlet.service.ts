import outletRepository from '../repository/outlet.repository'
import { IOutlet } from '../model/outlet.model'

class OutletService {
    async createOutlet(outletData: IOutlet): Promise<IOutlet> {
        return await outletRepository.create(outletData)
    }

    async editOutlet(outletId: string, updateData: Partial<IOutlet>): Promise<IOutlet | null> {
        return await outletRepository.update(outletId, updateData)
    }

    async deleteOutlet(outletId: string): Promise<IOutlet | null> {
        return await outletRepository.delete(outletId)
    }

    async getOutletById(outletId: string): Promise<IOutlet | null> {
        return await outletRepository.findById(outletId)
    }

    async getAllOutlets(): Promise<IOutlet[]> {
        return await outletRepository.findAll()
    }
}

export default new OutletService()
