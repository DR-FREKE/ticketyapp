import request from 'supertest';
import { app } from '../../app';

const signout_url = '/api/v1/usr/auth/signout';

describe('run test case for signout', () => {
  const mockSignUp = async () => {
    await request(app).post('/api/v1/usr/auth/signup').send({ email: 'solomonndi96@gmail.com', password: 'solagbaby' }).expect(201);
  };

  it('should return 200 and cookies should be empty', async () => {
    await mockSignUp();
    const response = await request(app).post(signout_url).send({}).expect(200);
    expect(response.get('Set-Cookie')).toBeDefined();
  });
});
