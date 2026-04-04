import {body} from 'express-validator';

export const registerValidator = [
    body('name')
    .trim()
    .notEmpty().withMessage('Name is required'),

    body('email')
        .isEmail().withMessage('Please provide a valid email address')
        .normalizeEmail(),
    
    body('password')
        .isLength({min: 6}).withMessage('Password must be at least 6 characters long'),

    body('role')
        .optional()
        .isIn(['freelancer', 'poster']).withMessage('Role must be either freelancer or poster'),

    body('campus')
        .trim()
        .notEmpty().withMessage('Campus information is required')
]