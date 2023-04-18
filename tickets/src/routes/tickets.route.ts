import { authorize } from '@sntickety/common-lib';
import { Router, Request, Response } from 'express';

const router: Router = Router();

router.get('/all-tickets', authorize, (req: Request, res: Response) => {
  res.send('this route gets all tickets');
});

export { router as tickerRouter };
