import { Request, Response, NextFunction } from 'express';

export { default as token } from './token';
export { default as currencies } from './currencies';


export const index = (req: Request, res: Response, next: NextFunction) => {
  res.status(200).send('Hello World!');
};
