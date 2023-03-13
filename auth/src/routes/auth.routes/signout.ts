import { Request, Response, Router } from 'express';

const router: Router = Router();

router.post('/signout', (req: Request, res: Response) => {
  // delete data inside request session
  req.session = null;
  res.send({});
});

export { router as signOutRouter };
