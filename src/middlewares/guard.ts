import { NextFunction, Request, Response } from 'express';
import { verifyToken } from '../helpers/generate-jwt-token';
import { Token } from '../common/user-types';
import { merge } from 'lodash-es';
import { AuthenticationError } from 'src/common/error.common';

export const IsAuthenticated = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const accessToken = req.headers.authorization || '';
  const { error, token }: Token = verifyToken(accessToken.split(' ')[1]);
  merge(req, { identity: token });
  if (error) {
    next(new AuthenticationError('Invalid token'));
  }
  next();
};
