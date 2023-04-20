import { Router } from 'express';
import { tickerRouter } from './tickets.route';

const app_route: Router = Router();

app_route.use('/', tickerRouter);

export { app_route as appRoute };
