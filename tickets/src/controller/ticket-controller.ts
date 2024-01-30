import { Request, Response } from 'express';
import { BadRequestError, NotAuthorizedError, NotFoundError } from '@sntickety/common-lib';
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
    res.send({ message: 'tickets gotten', tickets: all_tickets });
  }

  public static async getTicketById(req: Request, res: Response) {
    //
    const ticket_id = req.params.id;
    const ticket = await Ticket.findById(ticket_id);

    if (!ticket) throw new NotFoundError();

    res.send({ message: 'ticket retrieved', ticket }); // defaults to status code of 200
  }

  public static async editTicketById(req: Request, res: Response) {
    const ticket_id = req.params.id;
    const { title, price } = req.body;

    const ticket = await Ticket.findById(ticket_id);

    if (!ticket) throw new NotFoundError();

    if (ticket.userId !== req.currentUser!.id) throw new NotAuthorizedError();

    // this just makes update to the document in memory; it does not actually save/persist the update in the database
    ticket.set({
      title,
      price,
    });

    await ticket.save();

    res.status(204).send({ message: 'ticket updated', ticket });
  }
}
