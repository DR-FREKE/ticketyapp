import { body, ValidationChain } from 'express-validator';

export const validateRequestBody = (): ValidationChain[] => {
  return [
    body('email').isEmail().withMessage('Email must be valid!'),
    body('password').trim().isAlphanumeric().isLength({ min: 4, max: 20 }).withMessage('Password must be between 4 and 20 char'),
    body('firstname').isString().withMessage('firstname is invalid').isLength({ min: 1 }).withMessage('firstname is required'),
    body('lastname').isString().withMessage('lastname is invalid').isLength({ min: 1 }).withMessage('lastname is required'),
    body('phone').isString().isLength({ min: 10, max: 15 }).withMessage('phone must be between 10 and 11 char'),
  ];
};

export const validateLoginReqBody = (): ValidationChain[] => {
  return [body('email').isEmail().withMessage('Email must be valid!'), body('password').trim().notEmpty().withMessage('Password must be provided')];
};
