import request from 'supertest';
import { app } from '../../app';

const signout_url = '/api/v1/usr/auth/signout';

describe('run test case for signout', () => {
  const mockSignUp = async () => {
    await request(app).post('/api/v1/usr/auth/signup').send({ firstname: 'Ndifereke', lastname: 'Solomon', email: 'solomonndi96@gmail.com', password: 'solagbaby', phone: '08077946784' }).expect(201);
  };

  it('should return 200 and cookies should be empty', async () => {
    await mockSignUp();
    const response = await request(app).post(signout_url).send({}).expect(200);
    expect(response.get('Set-Cookie')).toBeDefined();
    /** OR
     * expect(response.get('Set-Cookie)[0]).toEqual("a string....we can print the response to see this string")
     */
  });
});
