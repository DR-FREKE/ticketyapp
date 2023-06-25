import { authorize, validateRequest } from '@sntickety/common-lib';
import { Router, Request, Response } from 'express';
import { validateTicketsBody } from '../middleware/body-validator';

const router: Router = Router();
const validate = validateTicketsBody();

router.get('/all-tickets', authorize, (req: Request, res: Response) => {
  res.send('this route gets all tickets');
});

router.post('/create-ticket', authorize, validate, validateRequest, async (req: Request, res: Response) => {
  res.send({ message: 'created tickets' });
});

export { router as tickerRouter };
