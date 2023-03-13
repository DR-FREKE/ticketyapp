import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { NotAuthorizedError } from '../errors/not-authorized-error';

/** this is how we can reach into an existing type definition like Request and make a modification to it.
 * previously, we'd try to create a CustomRequest Interface and extend to existing Request interface and add the currentUser property
 * as this:
 * interface CustomRequest extends Request{
 *      currentUser?: UserPayload
 * }
 * this won't work because this is a middleware and would cause an error anywhere we try to use this middleware
 */
declare global {
  namespace Express {
    interface Request {
      currentUser?: UserPayload;
    }
  }
}

// this is created so jwt.verify does not return an optional string or object [jwt.JwtPayload]
interface UserPayload {
  id: string;
  email: string;
}

export const authorize = (req: Request, res: Response, next: NextFunction) => {
  //checks if jwt is in the cookie session
  if (!req.session?.jwt) {
    // return next();
    throw new NotAuthorizedError('UnAuthorized Request');
  }

  // catch error if jwt token in session is invalid
  try {
    const user_data = <UserPayload>jwt.verify(req.session.jwt, process.env.JWT_KEY!);
    req.currentUser = user_data;
  } catch (error) {
    throw new NotAuthorizedError('UnAuthorized Request');
  }

  next();
};
