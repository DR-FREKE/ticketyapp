import { Request, Response, Router } from 'express';
import { ValidationChain, validationResult } from 'express-validator';
import { SignInController } from '../../controller/signin-controller';
import { RequestValidationError } from '../../errors/request-validator-error';
import { validateLoginReqBody } from '../../middleware/body-validator';
import { validateRequest } from '../../middleware/validate-request';

const router: Router = Router();
const validate: ValidationChain[] = validateLoginReqBody();

router.post('/signin', validate, validateRequest, SignInController.loginUser);

export { router as signInRouter };
