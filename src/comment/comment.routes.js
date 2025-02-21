import { Router } from 'express'
import { isAdmin, validateJwt } from '../../middlewares/validate.jwt.js'



const api = Router()

api.post('/add',[validateJwt,isAdmin],addComment)


export default api