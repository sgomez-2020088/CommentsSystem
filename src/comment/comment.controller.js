import Comment from '../comment/comment.model.js'
import Publication from '../publication/publication.model.js'


export const addComment = async (req, res) => {
    try {
        const data = req.body
        const author = req.user.id

        const addedPublication = await Publication.findById(data.publication)
        if(!addedPublication) return res.status(404).send({message: 'Publication not found', success: false})

        const newComment = new Comment({...data,author})
        await newComment.save()

        const populateComment = await Comment.findById(newComment._id)
            .populate('author', 'name surname username')
            .populate({
                path: 'publication',
                select: 'title',
                populate: {
                    path: 'category', 
                    select: 'name -_id'
                }
            })
            
        return res.send({message: 'Comment added successfully', comment: populateComment ,succes: true})
    } catch (err) {
        console.error(err)
        return res.status(500).send({message: 'General error', success: false})
    }
}
