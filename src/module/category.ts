import {Schema,model} from 'mongoose'
export interface ICategory {
    nameCategory:string
}
const categorySchema = new Schema<ICategory>({
    nameCategory:String
})

export const Category = model<ICategory>('category',categorySchema)
