import {body} from 'express-validator';

export const createGigValidator = [
    body('title')
        .trim()
        .notEmpty().withMessage('Title is required')
        .isLength({max: 100}).withMessage('Title cannot exceed 100 characters'),

    body('description')
        .notEmpty().withMessage('Description is required'),
    
    body('budget.amount')
        .isNumeric().withMessage('Budget amount must be a number')
        .custom(val => val >= 0).withMessage('Budget cannot be negative'),

    body('budget.currency')
        .optional()
        .isString().toUpperCase()
        .isLength({ min: 3, max: 3 }).withMessage('Currency must be a 3-letter code (e.g. USD)'),
    
    body('category')
        .trim()
        .notEmpty().withMessage('Category is required'),
    
    body('deadline')
        .isISO8601().withMessage('Please provide a valid date for the deadline')
        .custom(val => new Date(val) > new Date()).withMessage('Deadline must be in the future'),
    
    body('status')
        .optional()
        .isIn(['open', 'in_progress', 'completed', 'cancelled', 'closed'])
        .withMessage('Invalid status type')
];