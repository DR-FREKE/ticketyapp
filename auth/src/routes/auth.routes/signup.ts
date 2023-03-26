import { Router, Request, Response } from 'express';
import { validateRequestBody } from '../../middleware/body-validator';
import { ValidationChain, validationResult } from 'express-validator';
import { RequestValidationError } from '@sntickety/common-lib';
import { User } from '../../model/user';
import { BadRequestError } from '@sntickety/common-lib';
import { SignUpController } from '../../controller/signup-controller';
import { validateRequest } from '@sntickety/common-lib';

const router: Router = Router();
const validate: ValidationChain[] = validateRequestBody();

// always remember to put the common error catcher middleware after the request body middleware
router.post('/signup', validate, validateRequest, SignUpController.createUser);

export { router as signUpRouter };
