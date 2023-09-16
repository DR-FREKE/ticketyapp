import { app } from '../../app';
import request from 'supertest';
import { Ticket } from '../../model/tickets';
import mongoose from 'mongoose';

const ticket_url = '/api/v1/tkts/tickets';

const createTicket = () => {
  const cookie = global.signup();

  return request(app).post(ticket_url).set('Cookie', cookie).send({ title: 'some title', price: 20 }).expect(201);
};

describe('run test cases for showing tickets', () => {
  it('returns 404 if ticket is not found', async () => {
    /** when we ren this test, it failed  even if the id was wrong. The error was the id that was passed as mongoose does not
     * understand the id that was passes. to solve this, we need to generate an ID that mongoose understands.
     */
    const id = new mongoose.Types.ObjectId().toHexString();
    await request(app).get(`${ticket_url}/${id}`).set('Cookie', global.signup()).send().expect(404);
  });

  it('returns the ticket if the ticket is found and also a 200 status code', async () => {
    // before we try to fetch the data to check if it matches with what we're looking for, we need to make sure there's data inside the database
    // there are two ways we can do this... first we can directly use the mock mongodb instance to add data to the db or we can call out post
    // api to add data to the db... people prefer the direct one but I'll be using the api calling style
    /** method one can be
     * ticket = Ticket.build({pass data here}); await ticket.save()
     */

    // second and one I prefer
    const cookie = global.signup();
    const response = await request(app).post(ticket_url).set('Cookie', cookie).send({ title: 'some title', price: 20 }).expect(201);
    const ticket_response = await request(app).get(`${ticket_url}/${response.body.ticket.id}`).set('Cookie', cookie).send().expect(200);

    expect(ticket_response.body.title).toEqual('some title');
    expect(ticket_response.body.price).toEqual(20);
  });

  it('it can fetch a list of tickets', async () => {
    // first add a ticket to the DB because the mongoose instance we use in the test cases usually clean the store when operation is done
    // we did set this up in one of the test hook. so even though in the previous test, we did add data to the mongoose test intance,
    // it would get cleaned out
    await createTicket();
    await createTicket();
    await createTicket();

    const response = await request(app).get(ticket_url).set('Cookie', global.signup()).send().expect(200);

    expect(response.body.length).toEqual(3);
  });
});
