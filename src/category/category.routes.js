import { Router } from 'express'
<<<<<<< HEAD
import { addCategory, updateCategoryValidator } from '../../middlewares/validators.js'
import { createCategory, updateCategory, deleteCategory } from '../category/category.controller.js'
=======
import { addCategory  } from '../../middlewares/validators.js'
import { createCategory, updateCategory, deleteCategory, getCategory } from '../category/category.controller.js'
>>>>>>> f8ad0d9 (Se agrega ruta get en category)
import {validateJwt,  isAdmin } from '../../middlewares/validate.jwt.js'

const api = Router()

api.post('/add',[validateJwt,isAdmin,addCategory],createCategory)

api.put('/update',[validateJwt, isAdmin, updateCategoryValidator],updateCategory)

api.delete('/delete',[validateJwt,isAdmin],deleteCategory)

api.get('/all',[validateJwt,isAdmin],getCategory)
export default api