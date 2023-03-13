import { Request, Response, Router } from 'express';
import { NotAuthorizedError } from '../errors/not-authorized-error';
import { authorize } from '../middleware/authorization-middleware';

const router: Router = Router();

router.get('/current-user', authorize, (req: Request, res: Response) => {
  //
  res.send({ currentUser: req.currentUser });
});

router.get('/all-users', authorize, (req: Request, res: Response) => {
  // just for testing...
  res.send({ users: 'all users' });
});

export { router as currentUserRouter };
