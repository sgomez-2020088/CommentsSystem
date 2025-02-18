import { body } from 'express-validator' 
import { validateErrors} from './validate.errors.js'
import { exitEmailUser, exitUsername } from './db.validators.js'

export const registerValidator = [
    body('name', 'Name cannot be empty').notEmpty(),
    body('surname', 'Name cannot be empty').notEmpty(),
    body('username','Username cannot be empty').notEmpty().custom(exitUsername),
    body('email', 'Email cannot be empty').notEmpty().isEmail().custom(exitEmailUser),
    body('password', 'Password cannot be empty').notEmpty().isStrongPassword().withMessage('Password must be strong').isLength({min:8}),
    body('phone', 'Phone cannot be empty').notEmpty().isMobilePhone(),
    validateErrors       
]


export const loginValidator = [
    body('userData')
        .notEmpty().withMessage('Your information cannot be empty').trim(), 
    body('password').notEmpty().withMessage('Password cannot be empty')
        .isLength({ min: 8 }).withMessage('Password must be at least 8 characters long'), // 🔥 Validación simple
    validateErrors       
]