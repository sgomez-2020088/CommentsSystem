import Comment from '../models/comment.model.js'
import Publication from '../models/publication.model.js'


export const addComment = async (req, res) => {
    try {
        const data = req.body
        const author = req.user.id

        const addedPublication = await Publication.findById(publication)
        if(!addedPublication) return res.status(404).send({message: 'Publication not found', success: false})

        const newComment = new Comment({data, author})
        await newComment.save()
        return res.send({message: 'Comment added successfully', comment: newComment ,succes: true})
    } catch (err) {
        console.error(err)
        return res.status(500).send({message: 'General error', success: false})
    }
}