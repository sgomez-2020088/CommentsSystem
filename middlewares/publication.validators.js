import Publication from '../src/publication/publication.model.js'

export const isPublicationAuthor = async (req, res, next) => {
    try {
        const { id } = req.body 
        const userId = req.user.id 

        if (!id) return res.status(400).send({ message: 'Publication ID is required in body', success: false })
        const publication = await Publication.findById(id)
        if (!publication) return res.status(404).send({ message: 'Publication not found', success: false })
        if (publication.author.toString() !== userId.toString()) return res.status(403).send({ message: 'You are not the author of this publication', success: false })

        next() 
    } catch (err) {
        console.error(err)
        res.status(500).send({ message: 'General error', success: false })
    }
}

