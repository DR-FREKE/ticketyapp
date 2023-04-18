import { app } from '../../app';
import request from 'supertest';

describe('run test cases for tickets', () => {
  it('should have a route called /api/v1/tickets for creating tickets', async () => {
    /** TODO */
    const response = await request(app).post('/api/v1/tickets/create-ticket').send({});
    expect(response.status).not.toEqual(404);
  });

  it('should be accessed if user is signed in', async () => {
    /** TODO */
  });

  it('should return an error if invalid title is provided', async () => {
    /** TODO */
  });

  it('should return an error if invalid price is provided', async () => {
    /** TODO */
  });

  it('should create a ticket with valid data given', async () => {
    /** TODO */
  });
});
