import { Request, Response } from 'express';
import { BadRequestError, NotFoundError } from '@sntickety/common-lib';
import { Ticket } from '../model/tickets';

export class TicketController {
  public constructor() {
    //
  }

  public static async createTicket(req: Request, res: Response) {
    const { price, title } = req.body; // get request data from client

    const ticket = Ticket.build({ price, title, userId: req.currentUser!.id });
    await ticket.save();

    res.status(201).send({ message: 'created tickets', ticket });
  }

  public static async getAllTickets(req: Request, res: Response) {
    //
    const all_tickets = await Ticket.find();
    res.send(all_tickets);
  }

  public static async getTicketById(req: Request, res: Response) {
    //
    const ticket_id = req.params.id;
    const ticket = await Ticket.findById(ticket_id);

    if (!ticket) throw new NotFoundError();

    res.send(ticket); // defaults to status code of 200
  }

  public static async updateTicketById(req: Request, res: Response) {
    const ticket_id = req.params.id;

    const ticket = await Ticket.findById(ticket_id);

    if (!ticket) throw new NotFoundError();

    ticket.set({
      title: 'Something new ticket',
      price: 38,
    });
  }
}
