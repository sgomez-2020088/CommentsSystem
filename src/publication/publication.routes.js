import { Router } from 'express'
import { validateJwt } from '../../middlewares/validate.jwt.js'
import { addPublication, updatePublication, deletePublication, getPublications } from './publication.controller.js'
import { addPublicationValidator, updatePublicationValidator, deletePublicationValidator} from '../../middlewares/validators.js'
import { isPublicationAuthor } from '../../middlewares/publication.validators.js'



const api = Router()

api.post('/add',[validateJwt,addPublicationValidator],addPublication)

api.put('/update',[validateJwt,isPublicationAuthor,updatePublicationValidator],updatePublication)

api.delete('/delete',[validateJwt,isPublicationAuthor,deletePublicationValidator],deletePublication)

api.get('/all',[validateJwt],getPublications)

export default api