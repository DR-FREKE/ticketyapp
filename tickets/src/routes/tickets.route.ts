import { authorize, validateRequest } from '@sntickety/common-lib';
import { Router, Request, Response } from 'express';
import { TicketController } from '../controller/ticket-controller';
import { validateTicketsBody } from '../middleware/body-validator';
import { Ticket } from '../model/tickets';

const router: Router = Router();
const validate = validateTicketsBody();

router.get('/tickets', authorize, TicketController.getAllTickets);
router.get('/tickets/:id', authorize, TicketController.getTicketById);
router.post('/tickets', authorize, validate, validateRequest, TicketController.createTicket);

export { router as tickerRouter };
