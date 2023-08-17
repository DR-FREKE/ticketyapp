import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
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

    res.status(201).send({ message: 'created tickets' });
  }

  public static async getAllTickets(req: Request, res: Response) {
    //
  }

  public static async getTicketById(req: Request, res: Response) {
    //
    const ticket_id = req.params.id;
    const ticket = await Ticket.findById(ticket_id);

    if (!ticket) throw new NotFoundError();

    res.send(ticket);
  }
}
