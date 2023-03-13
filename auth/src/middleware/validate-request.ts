import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { RequestValidationError } from '../errors/request-validator-error';

/** function to check an error occured in our request body. this function will be shared among our different
 * route and will do this as a middleware. This is done to prevent redundant code or code repition.
 */

export const validateRequest = (req: Request, res: Response, next: NextFunction): void => {
  const error = validationResult(req); // get errors from request validation

  // if error in array is not empty
  if (!error.isEmpty()) {
    throw new RequestValidationError(error.array());
  }
  next();
};
