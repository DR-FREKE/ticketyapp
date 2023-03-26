import { Request, Response, NextFunction } from 'express';
import { CustomError } from '../errors/custom-error';

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction): void => {
  // determining error type use instanceof
  if (err instanceof CustomError) res.status(err.statusCode).send({ errors: err.serializeError() });

  //for other generic errors
  // res.status(400).send({ errors: [{ message: err.message }] });
};