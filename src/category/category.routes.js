import { Router } from 'express'
import { addCategory, updateCategoryValidator } from '../../middlewares/validators.js'
import { createCategory, updateCategory, deleteCategory, getCategory } from '../category/category.controller.js'
import {validateJwt,  isAdmin } from '../../middlewares/validate.jwt.js'

const api = Router()

api.post('/add',[validateJwt,isAdmin,addCategory],createCategory)

api.put('/update',[validateJwt, isAdmin, updateCategoryValidator],updateCategory)

api.delete('/delete',[validateJwt,isAdmin],deleteCategory)

api.get('/all',[validateJwt],getCategory)
export default api