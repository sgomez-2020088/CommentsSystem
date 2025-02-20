import { Router } from 'express'
import { addCategory, updateCategoryValidator } from '../../middlewares/validators.js'
import { createCategory, updateCategory, deleteCategory } from '../category/category.controller.js'
import {validateJwt,  isAdmin } from '../../middlewares/validate.jwt.js'

const api = Router()

api.post('/add',[validateJwt,isAdmin,addCategory],createCategory)

api.put('/update',[validateJwt, isAdmin, updateCategoryValidator],updateCategory)

api.delete('/delete',[validateJwt,isAdmin],deleteCategory)
export default api