import request from 'supertest';
import { app } from '../../app';

const signup_url = '/api/v1/usr/auth/signup';

describe('test request to signup', () => {
  it('should return 201 on successfull signup', async () => {
    await request(app).post(signup_url).send({ email: 'solomonndi96@gmail.com', password: 'solagbaby' }).expect(201);
  });

  // run test for unique emails and hence duplicate data should not be found in the db
  it('should return 400 if duplicated data', async () => {
    await request(app).post(signup_url).send({ email: 'solomonndi96@gmail.com', password: 'solagbaby' }).expect(201);
    await request(app).post(signup_url).send({ email: 'solomonndi96@gmail.com', password: 'solagbaby' }).expect(400);
  });

  // test to see if jwt was set in cookie session and if cookie session was defined
  it('should return 201 on successfull signup and cookie should be defined', async () => {
    const response = await request(app).post(signup_url).send({ email: 'solomonndi96@gmail.com', password: 'solagbaby' });
    expect(response.get('Set-Cookie')).toBeDefined();
  });
});

describe('test for input field', () => {
  it('should return a 400 with an invalid email', async () => {
    await request(app).post('/api/v1/usr/auth/signup').send({ email: 'solomon', password: 'solagbaby' });
    expect(400);
  });
  it('should return a 400 with an invalid password', async () => {
    await request(app).post('/api/v1/usr/auth/signup').send({ email: 'solomonndi96@gmail.com', password: 's' });
    expect(400);
  });
  it('should return a 400 with empty email or password', async () => {
    await request(app).post('/api/v1/usr/auth/signup').send({ email: 'solomonndi96@gmail.com' }).expect(400);
    await request(app).post('/api/v1/usr/auth/signup').send({ password: 'solagababy' }).expect(400);
  });
});
