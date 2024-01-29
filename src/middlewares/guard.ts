import { NextFunction, Request, Response } from 'express';
import { verifyToken } from '../helpers/generate-jwt-token';
import { Token } from '../common/user-types';
import { merge } from 'lodash-es';

export const IsAuthenticated = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const accessToken = req.headers.authorization || '';
  const { error, token }: Token = verifyToken(accessToken.split(' ')[1]);
  merge(req, { identity: token });
  if (error) {
    return res.status(403).json({ error });
  }
  next();
};
