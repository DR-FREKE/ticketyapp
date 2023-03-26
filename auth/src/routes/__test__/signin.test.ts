import request from 'supertest';
import { app } from '../../app';

const signin_url = '/api/v1/usr/auth/signin';

describe('test request to signin', () => {
  // run test to check if user has an account
  it('should return 400 if user has no account', async () => {
    await request(app).post(signin_url).send({ email: 'solomonndi96@gmail.com', password: 'solagbaby96' });
    expect(400);
  });

  // mock function for signup so we can test more signin function
  // const mockSignUp = async () => {
  //   await request(app).post('/api/v1/usr/auth/signup').send({ firstname: 'Ndifereke', lastname: 'Solomon', email: 'solomonndi96@gmail.com', password: 'solagbaby', phone: '08077946784' }).expect(201);
  // };

  // run test for incorrect password
  it('should fail when provided an incorrect email or password', async () => {
    await global.signup();
    await request(app).post(signin_url).send({ email: 'solomonndi96@gmail.com', password: 'solagbaby96ndi' }).expect(400);
    await request(app).post(signin_url).send({ email: 'solomon@gmail.com', password: 'solagbaby' }).expect(400);
  });

  // run test to check if jwt was set in cookie session and if cookie session was created
  it('should respond with a cookie when given the right credentials', async () => {
    await global.signup();
    const response = await request(app).post(signin_url).send({ email: 'solomonndi96@gmail.com', password: 'solagbaby' }).expect(200);
    expect(response.get('Set-Cookie')).toBeDefined();
  });
});
