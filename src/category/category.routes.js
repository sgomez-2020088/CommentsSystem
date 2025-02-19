import { Router } from 'express'
import { addCategory  } from '../../middlewares/validators.js'
import { createCategory, updateCategory, deleteCategory } from '../category/category.controller.js'
import {validateJwt,  isAdmin } from '../../middlewares/validate.jwt.js'

const api = Router()

api.post('/add',[validateJwt,isAdmin,addCategory],createCategory)

api.put('/update',[validateJwt,isAdmin],updateCategory)

api.delete('/delete',[validateJwt,isAdmin],deleteCategory)
export default api