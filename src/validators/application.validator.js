import { body, param } from 'express-validator';

export const applyValidator = [
  param('gigId').isMongoId().withMessage('Invalid Gig ID format'),
  
  body('coverLetter')
    .trim()
    .notEmpty().withMessage('Cover letter is required')
    .isLength({ min: 50 }).withMessage('Cover letter should be more descriptive (min 50 chars)'),
    
  body('status')
    .optional()
    .isIn(['pending', 'accepted', 'rejected']).withMessage('Invalid application status')
];