import request from 'supertest';
import { app } from '../../app';

const currentuser_url = '/api/v1/usr/users/current-user';

describe('run test case to get users', () => {
  // this will fail if we expect a 200 because we're not actually passing the cookies alongside this request hence it is not authorized
  // if we were to expect a 401 then it will pass
  it('should respond with details about the current user', async () => {
    const cookie = await global.signup();
    const response = await request(app).get(currentuser_url).set('Cookie', cookie).send().expect(200);

    console.log('val', response.body);
    expect(response.body.currentUser.email).toEqual('solomonndi96@gmail.com');
  });

  it('should respond with 401 if not authorized', async () => {
    await request(app).get(currentuser_url).send().expect(401);
  });
});
