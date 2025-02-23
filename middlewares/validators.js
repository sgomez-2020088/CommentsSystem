import { body } from 'express-validator' 
import { validateErrors} from './validate.errors.js'
import { exitEmailUser, exitUsername } from './db.validators.js'

export const registerValidator = [
    body('name', 'Name cannot be empty').notEmpty(),
    body('surname', 'Surname cannot be empty').notEmpty(),
    body('username','Username cannot be empty').notEmpty().custom(exitUsername),
    body('email', 'Email cannot be empty').notEmpty().isEmail().custom(exitEmailUser),
    body('password', 'Password cannot be empty').notEmpty().isStrongPassword().withMessage('Password must be strong').isLength({min:8}),
    body('phone', 'Phone cannot be empty').notEmpty().isMobilePhone(),
    validateErrors       
]

export const loginValidator = [
    body('userData','Your information cannot be empty').notEmpty().toLowerCase(),
    body('password', 'Password cannot be empty').notEmpty().isStrongPassword().isLength({min:8}),
    validateErrors       
]

export const addCategory = [
    body('name','Category name cannot be empty').notEmpty().toLowerCase(),
    body('description','Description cannot be empty').notEmpty(),
    validateErrors
]

export const updateCategoryValidator = [
    body('id','Id is necesary to update').notEmpty(),
    body('name','name cannot be a blank').optional().notEmpty(),
    body('description','Description cannot be a blank').optional().notEmpty(),
    validateErrors
]

export const updateUser = [
    body('oldPass').if(body('newPassword').exists()).notEmpty().withMessage('Old password is required to update profile'),
    body('name', 'Name cannot be a blank').optional().notEmpty(),
    body('surname', 'Surname cannot be a blank').optional().notEmpty(),
    body('username', 'Username cannot be a blank').optional().notEmpty(),
    body('phone', 'Phone cannot be a blank').optional().notEmpty(),
    body('newPassword', 'New password cannot be a blank').optional().notEmpty().isStrongPassword().withMessage('Password must be strong').isLength({min:8}),
    validateErrors
]

export const addPublicationValidator = [
    body('title','Title cannot be empty').notEmpty(),
    body('category','Category cannot be empty').notEmpty(),
    body('content','Content cannot be empty').notEmpty(),
    validateErrors
]

export const updatePublicationValidator = [
    body('id','Id is necesary to update the publication').notEmpty(),
    body('title','Title cannot be a blank').optional().notEmpty(),
    body('category','Category cannot a blank').optional().notEmpty(),
    body('content','Content cannot a blank').optional().notEmpty(),
    validateErrors
]

export const deletePublicationValidator = [
    body('publication','Publication cannot be empty').notEmpty(),
    body('content','Content cannot be empty').notEmpty(),
    validateErrors
]

export const addCommentValidator = [
    body('publication','Id cannot be empty').notEmpty(),
    body('content','Content cannot be empty').notEmpty(),
    validateErrors
]

export const updateCommentValidator = [
    body('id','Id cannot be empty').notEmpty(),
    body('content','Content cannot be a blank').optional().notEmpty(),
    validateErrors
]

export const deleteCommentValidator = [
    body('id','Id cannot be empty').notEmpty(),
    validateErrors
]