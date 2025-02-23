import {Schema, model} from 'mongoose'

const commentSchema = new Schema({
    publication: {
        type: Schema.Types.ObjectId,
        ref: 'Publication',
        required: [true, 'Publication is required']
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Author is required']
    },
    content: {
        type: String,
        required: [true, 'Content is required'],
        maxLength: [300, `Can't exceed 300 characters`]
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    status: {
        type: Boolean,
        default: true
    }
})

commentSchema.methods.toJSON = function(){
    const{_v, ...comment} = this.toObject()
    return comment
}
export default model('Comment', commentSchema)


