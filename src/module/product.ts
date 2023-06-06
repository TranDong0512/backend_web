import {Schema,model} from 'mongoose'
import {ICategory} from "./category";

export interface IProduct {
    nameProduct ?:string,
    price ?:number,
    category ?: ICategory,
    status ?: boolean,
    address ?: string,
    description ?:string

}
const ProductSchema = new Schema<IProduct>({
    nameProduct : String,
    price : Number,
    category : {
        type: Schema.Types.ObjectId,
        ref:"category"
    },
    status : Boolean,
    address : String,
    description:String,
})

export const Product = model<IProduct>('product',ProductSchema)
