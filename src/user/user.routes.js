import { Router } from 'express'
import { isAdmin, validateJwt } from '../../middlewares/validate.jwt.js'
import { updateProfile, allUsers} from '../user/user.controller.js'
import { updateUser } from '../../middlewares/validators.js'


const api = Router()

api.put('/update',[validateJwt,updateUser],updateProfile)

api.get('/all',[validateJwt, isAdmin],allUsers)

export default api