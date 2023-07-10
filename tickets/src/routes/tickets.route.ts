import { authorize, validateRequest } from '@sntickety/common-lib';
import { Router, Request, Response } from 'express';
import { TicketController } from '../controller/ticket-controller';
import { validateTicketsBody } from '../middleware/body-validator';
import { Ticket } from '../model/tickets';

const router: Router = Router();
const validate = validateTicketsBody();

router.get('/all-tickets', authorize, (req: Request, res: Response) => {
  res.send('this route gets all tickets');
});

router.post('/create-ticket', authorize, validate, validateRequest, TicketController.createTicket);

export { router as tickerRouter };
