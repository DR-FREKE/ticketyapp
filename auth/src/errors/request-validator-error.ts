import { ValidationError } from 'express-validator';
import { ErrorType } from '../types';
import { CustomError } from './custom-error';

const processData = (error: ValidationError): ErrorType => ({
  message: error.msg,
  field: error.param,
});

// build custom implementation of an error in this case, it's input validation error
export class RequestValidationError extends CustomError {
  public errors: ValidationError[]; // list of validation errors
  public statusCode: number = 400;
  public errorResponse: ErrorType[] = [];

  public constructor(errors: ValidationError[]) {
    super('Invalid Request Parameter'); // the string passed to the super is used by the CustomError class for fallback purpose
    this.errors = errors;

    // only done when extending a built in class which in this case it's the Error class
    Object.setPrototypeOf(this, RequestValidationError.prototype); // it works behind the scene
  }

  public serializeError(): ErrorType[] {
    this.errorResponse = this.errors.map(processData);
    return this.errorResponse;
  }
}
