import { Schema, model } from 'mongoose';

const publicationSchema = Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
        maxLength: [100, `Can't exceed 100 characters`]
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: [true, 'Category is required']
    },
    content: {
        type: String,
        required: [true, 'Content is required']
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Author is required']
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    status: {
        type: Boolean,
        default: true
    },
    comments: [{
        type: Schema.Types.ObjectId,
        ref: 'Comment'  
    }]
});

publicationSchema.methods.toJSON = function () {
    const { __v, _id, ...publication } = this.toObject();
    return publication;
};

export default model('Publication', publicationSchema);
