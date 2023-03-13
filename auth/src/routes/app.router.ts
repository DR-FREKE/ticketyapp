import { Router } from 'express';
import { currentUserRouter } from './current-user';
import { authRouter } from './auth.route';

const app_route: Router = Router();

app_route.use('/users', currentUserRouter);
app_route.use('/auth', authRouter);

export { app_route as appRoute };
