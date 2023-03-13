import { ErrorType } from '../types';
import { CustomError } from './custom-error';

export class NotFoundError extends CustomError {
  public statusCode: number = 404;
  public errors: string = 'Not Found Route';

  public constructor() {
    super('Route Not Found');

    Object.setPrototypeOf(this, NotFoundError.prototype);
  }

  public serializeError(): ErrorType[] {
    return [{ message: this.errors }];
  }
}
