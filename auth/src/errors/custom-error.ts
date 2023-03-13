import { ErrorType } from '../types';

export abstract class CustomError extends Error {
  public abstract statusCode: number;

  public constructor(message: string) {
    super(message);

    // only done when extending a built in class which in this case it's the Error class
    Object.setPrototypeOf(this, CustomError.prototype); // it works behind the scene
  }

  public abstract serializeError(): ErrorType[];
}
