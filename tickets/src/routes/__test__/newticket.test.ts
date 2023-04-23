import { app } from '../../app';
import request from 'supertest';

const ticket_url = '/api/v1/tickets/create-ticket';

describe('run test cases for tickets', () => {
  it('should have a route called /api/v1/tickets for creating tickets', async () => {
    /** TODO */
    const response = await request(app).post(ticket_url).send({});
    expect(response.status).not.toEqual(404);
  });

  it('should not be accessed if user is not signed in or cookie not provided', async () => {
    /** TODO */
    await request(app).post(ticket_url).send({}).expect(401);
  });

  it('should be accessed if user is signed in', async () => {
    /** TODO */
    const cookie = await global.signup();
    const response = await request(app).post(ticket_url).send({}).set('Cookie', cookie).expect(200);

    expect(response.body.currentUser.email).toEqual('solomonndi96@gmail.com');
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
