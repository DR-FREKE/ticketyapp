import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose, { Collection } from 'mongoose';
import { app } from '../app';
import request from 'supertest';

declare global {
  var signup: () => Promise<string[]>;
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
  const mongoUri = mongo.getUri(); // create a uri from the in memory db

  // connect to the in memory server using the mongoURI
  await mongoose.connect(mongoUri, {});
});

/** another hook that's going to run before each of our test cases */
beforeEach(async () => {
  // before each of our test cases, we need to reach the in memory mongo and delete or reset the data in there
  const collections = await mongoose.connection.db.collections(); // delete all the collections that exists inside the in memory mongo

  // loop over the collections and delete the data inside them
  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  if (mongo) {
    await mongo.stop();
  }
  await mongoose.connection.close();
});

/** helper function to signing up a user so we dont have to duplicate codes.
 * we could have just created a function in another file and export/import the
 * function anytime we needed it but we decided to make it global to avoid always
 * importing the file and function. we can just use this function by calling
 * global.signup() for testing any request that's supposed to be authorized
 */
global.signup = async () => {
  const email = 'solomonndi96@gmail.com';
  const password = 'solagbaby';

  const response = await request(app).post('/api/v1/usr/auth/signup').send({ email, password }).expect(201);
  const cookie = response.get('Set-Cookie');

  return cookie;
};
