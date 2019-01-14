import { Request, Response, NextFunction } from 'express';

export default (req: Request, res: Response) => {
  res.status(200).send('Here is a token for you');
}
