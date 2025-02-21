import Category from './category.model.js'
import Publication from '../publication/publication.model.js'

export const createCategory = async (req, res) => {
    try {
        const { name, description } = req.body

        const existingCategory = await Category.findOne({ name })
        if (existingCategory) {
            return res.status(400).send({ message: 'Category already exists' })
        }

        const newCategory = new Category({ name, description })
        await newCategory.save()

        res.send({ message: 'Category created successfully', category: newCategory, succes: true})
    } catch (err) {
        console.error(err)
        res.status(500).send({message: 'General error', success: false})
    }
}


export const updateCategory = async (req, res) => {
    try {
        const  id  = req.body.id
        const data = req.body

        const updateCategory = await Category.findByIdAndUpdate(id, data, {new:true})
        if(!updateCategory) return res.status(404).send({message: 'Category not found', success: false})
            return res.send({message: 'Category updated succesfully', category: updateCategory, success: true})
    } catch (err) {
        console.error(err)
        res.status(500).send({message: 'General error', success: false})
    }
}


export const deleteCategory = async (req, res) => {
    try {
        const { name } = req.body

        if (name === 'General') return res.status(403).send({ message: 'Default category cannot be deleted', success: false })
        
        const categoryToDelete = await Category.findOne({ name })
        if (!categoryToDelete) return res.status(404).send({ message: 'Category not found', success: false })
        

        let defaultCategory = await Category.findOne({ name: 'General' })
        if (!defaultCategory)defaultCategory = await Category.create({ name: 'General', description: 'Categoría por defecto' })
        

        await Publication.updateMany(
            { category: categoryToDelete._id },
            { category: defaultCategory._id }
        )

        await Category.deleteOne({ _id: categoryToDelete._id })
        res.send({ message: 'Category deleted successfully, publications reassigned', success: true })
    } catch (err) {
        console.error(err)
        res.status(500).send({ message: 'General error', success: false })
    }
}


export const getCategory = async(req, res) => {
    try {
        const category = await Category.find()
        if(category.length === 0) return res.status(404).send({message:'Category not found', success: false})
            return res.send({message: 'All is right', category, success: true})
        } catch (err) {
        console.error(err)
        return res.status(500).send({message: 'General error', success: FinalizationRegistry})
    }
}
