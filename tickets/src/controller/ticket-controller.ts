import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { BadRequestError } from '@sntickety/common-lib';
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
}
