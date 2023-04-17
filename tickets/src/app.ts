import express, { json } from 'express';
import 'express-async-errors';
import dotenv from 'dotenv';
import cookieSession from 'cookie-session';
import { NotFoundError, errorHandler } from '@sntickety/common-lib';

// create express instance
const app = express();

// connect env variables
dotenv.config();

// set app middleware
app.set('trust proxy', true);
/** traffic is being proxied to our application through ingress-nginx
 * i.e nginx is what directs our different request in our application to different service.
 * so express, by default is going to see that there's a proxy here and it's going to say it doesn't
 * trust this https connection but when set to true, that gets overridden. long story short, this step is to make sure express
 *  is aware that it's behind a proxy of ingress-nginx and it should still trust traffic
 *  has being secured even though it's coming from that proxy */

app.use(json());
app.use(
  cookieSession({
    signed: false, // to disable cookie encryption of data
    secure: process.env.NODE_ENV !== 'test', // cookies can only be used if user is visiting https connection. if we're in a test environment, set to false else set to true cus of our test cases. i.e supertest makes request to http as suppose to https
  })
);

// setup route middleware
app.get('/api/vi/tickets/home', (req, res) => res.send('Welcome to tickety Ticket service'));
app.all('*', () => {
  throw new NotFoundError();
});
app.use(errorHandler);

export { app };
