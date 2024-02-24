import { Token } from '@appTypes/token.types';
import { NextFunction, Request, Response } from 'express';
import { merge } from 'lodash-es';
import { AuthenticationError } from 'src/common/error.common';
import { verifyToken } from 'src/helpers/generate-jwt-token';

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
