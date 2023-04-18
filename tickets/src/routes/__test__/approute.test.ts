import request from 'supertest';
import { app } from '../../app';

describe('run test cases for invalid routes', () => {
  //
  it('should test for all invalid get routes', async () => {
    const response = await request(app).get('/');
    expect(response.status).toEqual(404);
  });

  it('should test for all invalid post routes', async () => {
    const response = await request(app).post('/api/').send({});
    expect(response.status).toEqual(404);
  });
});
