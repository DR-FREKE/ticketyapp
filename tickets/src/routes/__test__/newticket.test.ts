import { app } from '../../app';
import request from 'supertest';
import { Ticket } from '../../model/tickets';

const ticket_url = '/api/v1/tkts/tickets';

describe('run test cases for creating new tickets', () => {
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
    // first check if there's any available ticket
    let ticket = await Ticket.find({});
    expect(ticket.length).toEqual(0);

    const cookie = global.signup();
    const response = await request(app).post(ticket_url).set('Cookie', cookie).send({ title: 'some title', price: 20 }).expect(201);

    // after the api is called, check if a ticket was added by checking the length of tickets in the db
    ticket = await Ticket.find({});
    expect(ticket.length).toBeGreaterThan(0);
    expect(ticket[0].title).toEqual('some title');

    expect(response.body.message).toEqual('created tickets');
  });
});
