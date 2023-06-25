import { body, ValidationChain } from 'express-validator';

export const validateTicketsBody = (): ValidationChain[] => {
  return [body('title').isString().trim().notEmpty().withMessage('title is required'), body('price').isFloat({ gt: 0 }).trim().notEmpty().withMessage('price is required')];
};
