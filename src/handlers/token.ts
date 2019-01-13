import { Request, Response, NextFunction } from 'express';

export default (req: Request, res: Response) => {
  console.debug('===========> handle token request', req.body);
  res.status(200).send('Here is a token for you');
}
