import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { BadRequestError } from '@sntickety/common-lib';
import { User } from '../model/user';
import { PasswordHash } from '../services/password';

export class SignInController {
  public constructor() {
    //
  }

  public static async loginUser(req: Request, res: Response) {
    const { email, password } = req.body; // get request data from client

    const existingUser = await User.findOne({ email }); // check if user exist

    /** if user does not exist when trying to login throw a bad request error rather
     * than a not found error to give fewer information as to why authentication failed.
     * This is safer */
    if (!existingUser) {
      throw new BadRequestError('Invalid Credentials');
    }

    const password_match = await PasswordHash.comparePassword(existingUser.password, password);
    if (!password_match) throw new BadRequestError('Invalid Credentials');

    // if all good, generate jwt
    const userJwt = jwt.sign({ id: existingUser.id, email: existingUser.email }, process.env.JWT_KEY!, { expiresIn: '120s' });

    // store jwt in cookies
    req.session = {
      jwt: userJwt,
    };

    res.status(200).send(existingUser);
  }
}
