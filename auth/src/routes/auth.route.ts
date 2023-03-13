import { Router } from 'express';
import { signInRouter } from './auth.routes/signin';
import { signOutRouter } from './auth.routes/signout';
import { signUpRouter } from './auth.routes/signup';

const router: Router = Router(); // type inference should still work; so no need for adding the type, it's just my personal preference

router.use(signInRouter);
router.use(signOutRouter);
router.use(signUpRouter);

export { router as authRouter };
