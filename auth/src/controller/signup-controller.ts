import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { BadRequestError } from '../errors/bad-request-error';
import { User } from '../model/user';

export class SignUpController {
  public constructor() {
    //
  }

  public static async createUser(req: Request, res: Response) {
    const { email, password, firstname, lastname, phone } = req.body; // get request data from client
    const existingUser = await User.findOne({ email }); // search if user exists

    if (existingUser) {
      throw new BadRequestError('User already exist');
    }

    const user = User.build({ email, password, firstname, lastname, phone });
    await user.save(); // to actually save the created model above

    // generate JWT. the exclamation at the JWT_KEY is to tell typescript that we already checked that the environment variable is defined
    const userJwt = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_KEY!, { expiresIn: '120s' }); // using synchronous type

    // store it in the cookie session object
    req.session = {
      jwt: userJwt,
    };

    res.status(201).send(user);
  }
}
