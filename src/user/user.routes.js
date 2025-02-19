import { Router } from 'express'
import { validateJwt } from '../../middlewares/validate.jwt.js'
import { updateProfile} from '../user/user.controller.js'
import { updateUser } from '../../middlewares/validators.js'


const api = Router()

api.put('/update',[validateJwt,updateUser],updateProfile)

export default api