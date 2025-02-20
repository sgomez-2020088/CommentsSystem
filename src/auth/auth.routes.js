import { Router } from 'express'
import { registerUser, login } from './auth.controller.js'
import { registerValidator, loginValidator} from '../../middlewares/validators.js'


const api = Router()

api.post('/registerUser',[registerValidator],registerUser)


api.post('/login',[loginValidator],login)

export default api