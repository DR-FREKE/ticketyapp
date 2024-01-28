import { app } from '../../app';
import request from 'supertest';
import { Ticket } from '../../model/tickets';
import mongoose from 'mongoose';

const ticket_url = '/api/v1/tkts/tickets';

// do a bit of dependency injection to this function
const createTicket = (cookie = global.signup()) => {
  return request(app).post(ticket_url).set('Cookie', cookie).send({ title: 'some title', price: 20 }).expect(201);
};

describe('run test cases for updating tickets', () => {
  const id = new mongoose.Types.ObjectId().toHexString();

  it('return 404 if ticket not found', async () => {
    await request(app).put(`${ticket_url}/${id}`).set('Cookie', global.signup()).send({ title: 'new type of title', price: 30 }).expect(404);
  });

  it('should return 401 if user not loggedin but tries to edit', async () => {
    await request(app).put(`${ticket_url}/${id}`).send({}).expect(401);
  });

  it('should return a 401 if a user trying to update a ticket does not own the ticket', async () => {
    const response = createTicket(); // create a ticket and get back the ticket id...when creating a ticket, the userId gets registered as well.

    const id = (await response).body.ticket.id;

    // console.log((await response).body.ticket);

    await request(app).put(`${ticket_url}/${id}`).set('Cookie', global.signup()).send({ title: 'changed type', price: 50 }).expect(401);
  });

  it('should return a 400 error if invalid title or price is provided', async () => {
    /** TODO */
    const cookie = global.signup();

    const response = createTicket(cookie); // use same cookie data to create this ticket and use the same cookie data to update the ticket
    const ticket_id = (await response).body.ticket.id;

    await request(app).put(`${ticket_url}/${ticket_id}`).set('Cookie', cookie).send({ title: '', price: 20 }).expect(400);
    await request(app).put(`${ticket_url}/${ticket_id}`).set('Cookie', cookie).send({ price: 20 }).expect(400);
    await request(app).put(`${ticket_url}/${ticket_id}`).set('Cookie', cookie).send({ title: 'movie-ticket', price: -20 }).expect(400);
    await request(app).put(`${ticket_url}/${ticket_id}`).set('Cookie', cookie).send({ title: 'some title' }).expect(400);
  });

  it('should update the tickets with the right valid input provided', async () => {
    const cookie = global.signup();

    const response = createTicket(cookie);
    const ticket_id = (await response).body.ticket.id;

    await request(app).put(`${ticket_url}/${ticket_id}`).set('Cookie', cookie).send({ title: 'some title', price: 40 }).expect(204);
  });
});
