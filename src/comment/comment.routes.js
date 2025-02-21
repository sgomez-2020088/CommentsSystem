import { Router } from 'express'
import { validateJwt } from '../../middlewares/validate.jwt.js'
import { addComment } from '../comment/comment.controller.js'



const api = Router()

api.post('/add',[validateJwt],addComment)


export default api