import {Schema, model} from 'mongoose'

const categorySchema = new Schema({
    name: {
        type: String,
        required: [true, 'Category name is required'],
        maxLength: [30, `Can't exceed 30 characters`],
        unique: true,
        trim: true
    },
    description: {
        type: String,
        required: [true, 'Description name is required'],
        maxLength: [100, `Can't exceed 30 characters`]
    }
})

export default model('Category', categorySchema)
