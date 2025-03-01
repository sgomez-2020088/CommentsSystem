import { Router } from 'express'
import { validateJwt } from '../../middlewares/validate.jwt.js'
import { addComment, editComment, deleteComment, getUserComments} from '../comment/comment.controller.js'
import { addCommentValidator, updateCommentValidator, deleteCommentValidator } from '../../middlewares/validators.js'



const api = Router()

api.post('/add',[validateJwt,addCommentValidator],addComment)

api.put('/edit',[validateJwt, updateCommentValidator],editComment)

api.delete('/delete',[validateJwt, deleteCommentValidator],deleteComment)

api.get('/comments', [validateJwt], getUserComments)


export default api