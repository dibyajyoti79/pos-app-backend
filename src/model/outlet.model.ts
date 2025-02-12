import mongoose, { Document, Schema, Types } from 'mongoose'

// Interface for Address
interface IAddress {
    street: string
    city: string
    state: string
    postalCode: string
    country: string
    geoLocation?: {
        lat: number
        lng: number
    }
    landmark?: string
    fax?: string
    tinNo?: string
}

// Interface for Contact
interface IContact {
    phone: string
    email: string
    website?: string
}

// Interface for Operating Hours
interface IOperatingHours {
    [day: string]: {
        open: string
        close: string
    }
}

// Interface for Outlet
export interface IOutlet extends Document {
    name: string
    alias?: string
    description?: string
    address: IAddress
    contact: IContact
    operatingHours?: IOperatingHours
    additionalInfo?: string
    cuisineTypes: string[]
    ownerId: Types.ObjectId
    seatingCapacity?: string
    images: string[]
    logo?: string
    paymentOptions: string[]
    status: string
    restaurantType: string[]
    onlineOrderChannel: string[]
    code?: string
    fssaiLicNo?: string
    taxAuthorityName?: string
    outletServingType?: string
    validateUniqueSapCode?: number
    enableVariationWiseOptionInOnlineMenuOnOffPage?: number
    enableKotForOnlineOrder?: number
    gstNo?: string // ✅ Fix: Added gstNo as an optional property
}

// Define the Outlet Schema
const outletSchema: Schema<IOutlet> = new Schema(
    {
        name: { type: String, required: true },
        alias: { type: String },
        description: { type: String },
        address: {
            street: { type: String, required: true },
            city: { type: String, required: true },
            state: { type: String, required: true },
            postalCode: { type: String, required: true },
            country: { type: String, required: true },
            geoLocation: {
                lat: { type: Number },
                lng: { type: Number }
            },
            landmark: { type: String },
            fax: { type: String },
            tinNo: { type: String }
        },
        contact: {
            phone: { type: String, required: true },
            email: { type: String, required: true },
            website: { type: String }
        },
        operatingHours: {
            type: Map,
            of: { open: String, close: String },
            default: {}
        },
        additionalInfo: { type: String },
        cuisineTypes: { type: [String], required: true, default: [] },
        ownerId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        seatingCapacity: { type: String },
        images: { type: [String], default: [] },
        logo: { type: String },
        paymentOptions: { type: [String], default: [] },
        status: { type: String, default: 'active' },
        restaurantType: { type: [String], required: true, default: [] },
        onlineOrderChannel: { type: [String], default: [] },
        code: { type: String },
        fssaiLicNo: { type: String },
        taxAuthorityName: { type: String },
        outletServingType: { type: String },
        validateUniqueSapCode: { type: Number, default: 0 },
        enableVariationWiseOptionInOnlineMenuOnOffPage: { type: Number, default: 0 },
        enableKotForOnlineOrder: { type: Number, default: 0 },
        gstNo: { type: String } // ✅ Fix: Added gstNo field to schema
    },
    {
        timestamps: true // Auto-manage createdAt & updatedAt
    }
)

// Create and export the Outlet model
const outlet = mongoose.model<IOutlet>('Outlet', outletSchema)
export default outlet
