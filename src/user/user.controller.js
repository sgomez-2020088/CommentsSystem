import User from './user.model.js'

import { encrypt,checkPassword } from '../../utils/encrypt.js'


export const updateProfile = async (req, res) => {
    try {
        const userId = req.user.id
        const { oldPass, newPassword, ...data } = req.body 

        const user = await User.findById(userId)
        if (!user) return res.status(404).send({ message: 'User not found', success: false })

        const isMatch = await checkPassword(user.password, oldPass)
        if (!isMatch) return res.status(400).send({ message: 'Incorrect password', success: false })

        if (newPassword) user.password = await encrypt(newPassword)
        

        Object.assign(user, data)

        await user.save()
        res.send({ message: 'Profile updated successfully', succes: true })
    } catch (err) {
        console.error(err)
        res.status(500).send({ message: 'General error', success: false })
    }
}
