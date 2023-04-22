import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
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

global.signup = async () => {
  const firstname = 'Ndifereke';
  const lastname = 'Solomon';
  const email = 'solomonndi96@gmail.com';
  const password = 'solagbaby';
  const phone = '08077946785';

  const response = await request(app).post('https://tickety.dev/api/v1/usr/auth/signup').send({ firstname, lastname, email, password, phone }).expect(201);
  const cookie = response.get('Set-Cookie');

  return cookie;
};
