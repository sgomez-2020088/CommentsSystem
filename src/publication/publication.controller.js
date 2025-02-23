import Publication from '../publication/publication.model.js'
import Category from '../category/category.model.js'

export const getPublications = async (req, res) => {
    try {
        const { limit = 20, skip = 0, comLimit = 5, comSkip = 5} = req.query

        const publications = await Publication.find({ status: true })
            .skip(skip)
            .limit(limit)
            .populate('category', 'name -_id')
            .populate('author', 'name username -_id')
            .populate({
                path: 'comments',
                match: {status: true},
                select: 'author content -_id',
                options:{
                    limit: comLimit,
                    skip: comSkip
                },
                populate: {
                    path: 'author',
                    select: 'name username -_id'
                }
            })

        if (publications.length === 0) {
            return res.status(404).send({ message: 'Publications not found', success: false })
        }

        return res.send({ message: 'All is right', publications, success: true })
    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'General error', success: false })
    }
}

export const addPublication = async (req, res) => {
    try {
        const data = req.body
        const author = req.user.id 

        const existCategory = await Category.findById(data.category)
        if (!existCategory) return res.status(404).send({ message: 'Invalid category', success: false })
    
        const publication = new Publication({ ...data, author })
        await publication.save()

        const populatedPublication = await Publication.findById(publication._id)
            .populate('author', 'name surname username -_id') 
            .populate('category', 'name -_id')


        return res.send({ message: 'Publication created successfully', success: true, publication: populatedPublication})
    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'General error', success: false})
    }
}

export const updatePublication = async (req, res) => {
    try {
        const { id, ...data } = req.body 
    
        const publication = await Publication.findById(id)
        if(publication.status === false) return res.status(404).send({message: 'This publication does not exist', success: false })

        const updatedPublication = await Publication.findByIdAndUpdate(
            id,
            { $set: data },
            { new: true, runValidators: true }
        )
        .populate('author', 'name surname username -_id')
        .populate('category', 'name description -_id')

        if (!updatedPublication) return res.status(404).send({ message: 'Publication not found', success: false })
        
        return res.send({ message: 'Publication updated successfully', success: true, publication: updatedPublication })
    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'General error', success: false })
    }
}

export const deletePublication = async (req, res) => {
    try {
        const id  = req.body.id
        const publication = await Publication.findById(id)
        if(publication.status === false) return res.status(404).send({message: 'This publication does not exist', success: false })
        const deletedPublication = await Publication.findByIdAndUpdate(
            id,
            {status: false},
            {new: true}
        )
        if(!deletedPublication) return res.status(400).send({message:'publication not found', success: false})

        return res.send({ message: 'Publication deleted successfully', success: true })
    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'General error', success: false })
    }
}

