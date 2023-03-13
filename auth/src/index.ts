import { app } from './app';
import { dbConnector } from './database/db-connection';
/**
 * the reason we are seperating or have an app.ts file and an index.ts file
 * is for ease and flexibility of testing. supertest [a library we are using for testing] uses the
 * express app instance we created in the app.ts file to actually run the tests.
 * This is fine except that we tied a port to the app instance which means supertest will also
 * be using or running tests using this tied port. This might not look like a problem now because we have just one
 * service which is the auth service, when we begin to have multiple services with different ports and maybe two services
 * share a port then there's where it becomes complicated.
 *
 * So what we'll instead do is allow supertest pick a random port when it tries to use the app instance and
 * how we can do this is by seperating the app.listen finction which has the port and actually starts the app
 * on the main application from the app instance which will be used by supertest and the app itself hence we're
 * going to initialize and setup everything on the app.ts file and then actually start the app on the index.ts file
 *
 * NOTE: in the package.json change from ts-node-dev --poll src/app.ts to ts-node-dev --poll src/index.ts
 */

if (!process.env.JWT_KEY) throw new Error('JWT_KEY must be defined');

dbConnector();

app.listen(9001, () => console.log('app listening on port 9001!!!!'));
