import Publication from '../publication/publication.model.js'
import Category from '../category/category.model.js'

export const addPublication = async (req, res) => {
    try {
        const data = req.body
        const author = req.user.id 

        const existCategory = await Category.findById(data.category)
        if (!existCategory) return res.status(404).send({ message: 'Invalid category', success: false })
        

    
        const publication = new Publication({ ...data, author })
        await publication.save()

        const populatedPublication = await Publication.findById(publication._id)
            .populate('author', 'name surname username') 
            .populate('category', 'name')


        return res.send({ message: 'Publication created successfully', success: true, publication: populatedPublication})
    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'General error', success: false})
    }
}


export const updatePublication = async (req, res) => {
    try {
        const { id, ...data } = req.body 
        if (!id) return res.status(400).send({ message: 'Publication ID is required in body', success: false })
        

        const updatedPublication = await Publication.findByIdAndUpdate(
            id,
            { $set: data },
            { new: true, runValidators: true }
        ).populate('author', 'name surname username email')
        .populate('category', 'name description')

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
