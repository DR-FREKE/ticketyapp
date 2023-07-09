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
    const cookie = global.signup();
    const response = await request(app).post(ticket_url).set('Cookie', cookie).send();

    // expect(response.body.message).toEqual('create tickets');
    expect(response.status).not.toEqual(401);
  });

  it('should return an error if invalid title is provided', async () => {
    /** TODO */
    const cookie = global.signup();

    await request(app).post(ticket_url).set('Cookie', cookie).send({ title: '', price: 20 }).expect(400);
    await request(app).post(ticket_url).set('Cookie', cookie).send({ price: 20 }).expect(400);
  });

  it('should return an error if invalid price is provided', async () => {
    /** TODO */
    const cookie = global.signup();
    await request(app).post(ticket_url).set('Cookie', cookie).send({ title: 'movie-ticket', price: -20 }).expect(400);
    await request(app).post(ticket_url).set('Cookie', cookie).send({ title: 'some title' }).expect(400);
  });

  it('should create a ticket with valid data given', async () => {
    /** TODO */
    const cookie = global.signup();
    const response = await request(app).post(ticket_url).set('Cookie', cookie).send({ title: 'some title', price: 20 }).expect(201);

    expect(response.body.message).toEqual('created tickets');
  });
});
