import { ErrorType } from '../types';
import { CustomError } from './custom-error';

export class DatabaseConnectionError extends CustomError {
  errors: string = 'An error occured trying to connect to Database';
  statusCode: number = 500;

  public constructor() {
    super('Error connecting to DB');

    Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
  }
  public serializeError(): ErrorType[] {
    return [{ message: this.errors }];
  }
}
