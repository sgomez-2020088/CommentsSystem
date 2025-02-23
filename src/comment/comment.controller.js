import Comment from '../comment/comment.model.js'
import Publication from '../publication/publication.model.js'


export const addComment = async (req, res) => {
    try {
        const data = req.body;
        const author = req.user.id;

        const addedPublication = await Publication.findById(data.publication);

        if (!addedPublication || addedPublication.status === false) return res.status(404).send({ message: 'Publication not found or unavailable', success: false });

        const newComment = new Comment({ ...data, author });
        await newComment.save();

        addedPublication.comments.push(newComment._id);
        await addedPublication.save();


        const populatedComment = await Comment.findById(newComment._id)
            .populate('author', 'name surname username -_id')
            .populate({
                path: 'publication',
                select: 'title -_id',
                populate: {
                    path: 'category', 
                    select: 'name -_id'
                }
            });

        return res.send({ message: 'Comment added successfully', comment: populatedComment, success: true });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'General error', success: false });
    }
}

export const editComment = async (req, res) =>{
    try {
        const { id } = req.body
        const { content } = req.body 

        const editedComment = await Comment.findById(id)
        if (!editedComment) return res.status(404).send({ msg: 'Comment not found' })
        
        if (editedComment.author.toString() !== req.user.id.toString()) return res.status(403).send({ message: 'You are not authorized to edit this comment' })
        
    const updateComment = await Comment.findByIdAndUpdate(
        id,
        { content },
        { new: true }
    )
    .populate('author', 'name surname username')
    .populate({
        path: 'publication',
        select: 'title',
        populate: {
            path: 'category', 
            select: 'name -_id'
        }
    })

    return res.send({message: ' Comment edited successfully',updateComment, success: true})


    } catch (err) {
        console.error(err)
        return res.status(500).send({message: 'General error', success: false})
    }
}

export const deleteComment = async (req, res) => {
    try {
        const { id } = req.body  
        
    
        const deleteComment = await Comment.findByIdAndUpdate(
            id,
            { status: false },
            { new: true }
        )
        
        if (!deleteComment) return res.status(400).send({ message: 'Comment not found', success: false })

    
        if (deleteComment.author.toString() !== req.user.id.toString()) return res.status(403).send({ message: 'You are not authorized to delete this comment' })
        
        return res.send({ message: 'Comment deleted successfully', success: true })
    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'General error', success: false })
    }
}

export const getUserComments = async (req, res) => {
    try {
        const author = req.user.id

        const comments = await Comment.find({ author, status: true })
            .populate('publication', 'title')
            .populate({
                path: 'publication',
                select: 'title',
                populate: { 
                    path: 'category', 
                    select: 'name -_id' 
                }
            })

        if (comments.length === 0) return res.status(404).send({ message: 'You have no comments.', success: false })
        return res.send({ message: 'All is right', comments, success: true })

    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'General error', success: false })
    }
}
