import {NextFunction, Request, RequestHandler, Response} from 'express';
import jwt from 'jsonwebtoken';
import {Maybe} from 'tsmonad';

const auth = (secret: any) => (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const token = Maybe.maybe<string | string[]>(
    req.headers['x-access-token'] || req.headers.authorization,
  ).map((t: string) => t.replace(/^bearer\s+/i, ''));

  Maybe.sequence<string | string[]>({token, secret}).caseOf({
    just: ({token, secret}) => {
      next();
    },
    nothing: () => {
      const [status, msg] = secret.caseOf({
        just: () => [401, 'Not Authorized'],
        nothing: () => [500, 'Internal Server Error'],
      });
      res.status(status).send(msg);
    },
  });
};

export default auth;
