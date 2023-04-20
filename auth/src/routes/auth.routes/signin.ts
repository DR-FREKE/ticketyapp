import { Router } from 'express';
import { ValidationChain, validationResult } from 'express-validator';
import { SignInController } from '../../controller/signin-controller';
import { validateLoginReqBody } from '../../middleware/body-validator';
import { validateRequest } from '@sntickety/common-lib';

const router: Router = Router();
const validate: ValidationChain[] = validateLoginReqBody();

router.post('/signin', validate, validateRequest, SignInController.loginUser);

export { router as signInRouter };
