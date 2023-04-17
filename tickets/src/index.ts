import { app } from './app';
import { dbConnector } from './database/db-connection';

if (!process.env.JWT_KEY) throw new Error('JWT_KEY must be defined');

dbConnector();

app.listen(3009, () => console.log('app started on port 3009'));
