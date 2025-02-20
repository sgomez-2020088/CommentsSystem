import User from '../src/user/user.model.js'
import { encrypt } from '../utils/encrypt.js'
import Category from '../src/category/category.model.js'

export const createDefaultAdmin = async () => {
    try {
        const adminEmail = "admin@default.com"
        const existingAdmin = await User.findOne({ email: adminEmail })

        if (!existingAdmin) {
            const hashedPassword = await encrypt("Parmas./123")
            const adminUser = new User({
                name: "Admin",
                surname: "Default",
                username: "admin",
                email: adminEmail,
                password: hashedPassword,
                phone: "123456789",
                role: "ADMIN",
                status: true
            })

            await adminUser.save()
        }
    } catch (err) {
        console.error(err)
    }
}

export const createDefaultCategory = async () => {
    try {
        const defaultCategoryName = "General"
        const existingCategory = await Category.findOne({ name: defaultCategoryName })

        if (!existingCategory) {
            const defaultCategory = new Category({
                name: defaultCategoryName,
                description: "Categoría por defecto"
            })
            await defaultCategory.save()
        }
    } catch (err) {
        console.error(err)
    }
}
