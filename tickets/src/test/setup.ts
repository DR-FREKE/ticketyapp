import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import { app } from '../app';
import request from 'supertest';
import jwt from 'jsonwebtoken';

declare global {
  var signup: () => string[];
}

let mongo: MongoMemoryServer;

/** before all our different test starts up, create an instance of the mongodb-memory-server
 * which is going to start a copy of mongo db in memory which allows us run multiple test at the same
 * time across different project without them all trying to reach out to the same copy of mongo
 */
// beforeAll is a hook function and whatever you pass inside will run before all our test gets executed
beforeAll(async () => {
  process.env.JWT_KEY = 'asdfgh'; // cus in most of logic we try to access the JWT_KEY and if in our test cases this is not setup, it will eventually fail

  mongo = await MongoMemoryServer.create(); // create instance of mongo in memory
  const mongoURI = mongo.getUri(); // generate URL from mongomemoryserver

  await mongoose.connect(mongoURI, {}); // connect mongoose with the generated URI that we mongomemoryserver to create
});

// run before each test cases
beforeEach(async () => {
  //reach in to mongo memory server and delete or reset the data in there. this allows us manage our memory
  const collection = await mongoose.connection.db.collections();

  // loop through to delete the content inside the memory
  for (let collection_element of collection) {
    await collection_element.deleteMany({});
  }
});

// finally a hook that stops the mongomemoryserver and ends the mongoose connection after we are done with it
afterAll(async () => {
  if (mongo) {
    await mongo.stop();
  }
  await mongoose.connection.close();
});

global.signup = () => {
  /** because we can't make request to the auth service or we are trying to avoid a synchronous way of communication
   * to the auth service because of the problems that comes with that or even the problem that comes is making request
   * during test (response time and latency issues); what we can do is do a mock function that mimicks the creating of jwt and cookies
   * just like the signup function.
   */

  // create payload we can use to sign jwt...remember to import jsonwebtoken
  const credentials = {
    id: new mongoose.Types.ObjectId().toHexString(),
    email: 'solomonndi96@gmail.com',
  };

  // create the jwt
  const token = jwt.sign(credentials, process.env.JWT_KEY!); // again the exclamation mark is to tell typescript that process.env.JWT_KEY is defined and it is in our beforeAll hook.

  //create session object as {jwt:MY_TOKEN}
  const session = { jwt: token };

  //turn session into JSON because it was in javascript object
  const sessionJSON = JSON.stringify(session);

  // take JSON and encode it to base64
  const cookie_base64 = Buffer.from(sessionJSON).toString('base64');

  // return string that is the cookie with encoded data. always return cookie as an array of string
  return [`session=${cookie_base64}`];
};
