import { Router } from 'express'
import { registerUser, login } from '../auth/auth.controller.js'
import { registerValidator, loginValidator} from '../../middlewares/validators.js'


const api = Router()

api.post('/registerUser',[registerValidator],registerUser)


api.post('/login', login)

export default api