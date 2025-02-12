import { Request, Response } from 'express'
import { ApiResponse } from '../util/ApiResponse'
import responseMessage from '../constant/responseMessage'
import { asyncHandler } from '../util/asyncHandler'
import outletService from '../service/outlet.service'
import userService from '../service/user.service'
import { IUser } from '../model/user.model'
import { IOutlet } from '../model/outlet.model'
import { Types } from 'mongoose'

// Interface for request body validation
interface IRegisterOutletRequest {
    name: string
    ownerName: string
    mobile: string
    email: string
    address: IOutlet['address']
    gstNo?: string
    additionalInfo?: string
    cuisineTypes: string[]
    seatingCapacity?: string
    images: string[]
    logo?: string
    paymentOptions: string[]
    restaurantType: string[]
    onlineOrderChannel: string[]
    code?: string
    fssaiLicNo?: string
    taxAuthorityName?: string
    outletServingType?: string
    validateUniqueSapCode?: number
    enableVariationWiseOptionInOnlineMenuOnOffPage?: number
    enableKotForOnlineOrder?: number
}

// Register a new outlet
const registerOutlet = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { name, ownerName, mobile, email, address, gstNo, ...outletDetails } = req.body

    // Create a user for the outlet owner
    const user = await userService.addUser({
        name: ownerName,
        email,
        password: '123456', // Default password (ensure hashing in service)
        mobile,
        role: 'admin'
    })

    if (!user._id) {
        res.status(500).json(new ApiResponse(500, null, responseMessage.SOMETHING_WENT_WRONG))
        return
    }

    // Ensure `ownerId` is properly cast to `ObjectId`
    const ownerId = user._id
    // Create outlet data object
    const outletData: Omit<IOutlet, 'createdAt' | 'updatedAt'> = {
        ...outletDetails,
        name,
        address,
        gstNo: gstNo ?? '', // Fix: Ensure `gstNo` is handled
        ownerId,
        contact: { phone: mobile, email },
        status: 'active'
    }

    // Create the outlet
    const outlet = await outletService.createOutlet(outletData)

    if (!outlet) {
        res.status(500).json(new ApiResponse(500, null, responseMessage.SOMETHING_WENT_WRONG))
        return
    }

    res.status(201).json(new ApiResponse(201, outlet, responseMessage.OUTLET_CREATED))
})

// Edit an outlet
const editOutlet = asyncHandler(async (req: Request<Record<string, string>, object, Partial<IOutlet>>, res: Response): Promise<void> => {
    const { id } = req.params
    const updateData: Partial<IOutlet> = req.body

    const outlet = await outletService.editOutlet(id, updateData)

    if (!outlet) {
        res.status(404).json(new ApiResponse(404, null, responseMessage.NOT_FOUND('Outlet')))
        return
    }

    res.status(200).json(new ApiResponse(200, outlet, responseMessage.OUTLET_UPDATED))
})

// Delete an outlet
const deleteOutlet = asyncHandler(async (req: Request<Record<string, string>>, res: Response): Promise<void> => {
    const { id } = req.params

    const outlet = await outletService.deleteOutlet(id)

    if (!outlet) {
        res.status(404).json(new ApiResponse(404, null, responseMessage.NOT_FOUND('Outlet')))
        return
    }

    res.status(200).json(new ApiResponse(200, null, responseMessage.OUTLET_DELETED))
})

// Export all functions as a default object
export default { registerOutlet, editOutlet, deleteOutlet }

