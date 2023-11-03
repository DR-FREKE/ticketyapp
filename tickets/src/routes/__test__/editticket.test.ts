import { app } from '../../app';
import request from 'supertest';
import { Ticket } from '../../model/tickets';
import mongoose from 'mongoose';

const ticket_url = '/api/v1/tkts/tickets';

const createTicket = () => {
  const cookie = global.signup();

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

  it('should return a 401 if a user trying to update a ticket does not own the ticket', async () => {});

  it('should return an error if invalid title or price is provided', async () => {
    /** TODO */
    const response = await createTicket();
    const cookie = global.signup();

    await request(app).put(`${ticket_url}/${response.body.ticket.id}`).set('Cookie', cookie).send({ title: '', price: 20 }).expect(400);
    await request(app).put(`${ticket_url}/${response.body.ticket.id}`).set('Cookie', cookie).send({ price: 20 }).expect(400);
    await request(app).put(`${ticket_url}/${response.body.ticket.id}`).set('Cookie', cookie).send({ title: 'movie-ticket', price: -20 }).expect(400);
    await request(app).put(`${ticket_url}/${response.body.ticket.id}`).set('Cookie', cookie).send({ title: 'some title' }).expect(400);
  });

  it('should update the tickets with the right valid input provided', async () => {});
});
