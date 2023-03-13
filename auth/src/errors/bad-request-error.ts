import { ErrorType } from '../types';
import { CustomError } from './custom-error';

export class BadRequestError extends CustomError {
  public statusCode: number = 400;

  public constructor(public error: string) {
    super('Bad Request error');

    Object.setPrototypeOf(this, BadRequestError.prototype);
  }

  public serializeError(): ErrorType[] {
    return [{ message: this.error }];
  }
}
