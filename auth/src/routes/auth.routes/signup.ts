import { Router, Request, Response } from 'express';
import { validateRequestBody } from '../../middleware/body-validator';
import { ValidationChain, validationResult } from 'express-validator';
import { RequestValidationError } from '../../errors/request-validator-error';
import { User } from '../../model/user';
import { BadRequestError } from '../../errors/bad-request-error';
import { SignUpController } from '../../controller/signup-controller';
import { validateRequest } from '../../middleware/validate-request';

const router: Router = Router();
const validate: ValidationChain[] = validateRequestBody();

// always remember to put the common error catcher middleware after the request body middleware
router.post('/signup', validate, validateRequest, SignUpController.createUser);

export { router as signUpRouter };
