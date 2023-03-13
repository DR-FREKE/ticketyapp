import { ErrorType } from '../types';
import { CustomError } from './custom-error';

export class NotAuthorizedError extends CustomError {
  public statusCode: number = 401;

  public constructor(public error: string = '') {
    super('not authorized');

    Object.setPrototypeOf(this, NotAuthorizedError.prototype);
  }

  public serializeError(): ErrorType[] {
    return [{ message: this.error }];
  }
}
