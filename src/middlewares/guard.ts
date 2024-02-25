import { Token } from '@appTypes/token.types';
import { UserRequest } from '@dtos/user.dto';
import { NextFunction, Request, Response } from 'express';
import { isUndefined, merge } from 'lodash-es';
import {
  AuthenticationError,
  AuthorizationError,
} from 'src/common/error.common';
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

export const isAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const jwtToken = req.headers.authorization as string;
  if (isUndefined(jwtToken)) {
    return next(new AuthenticationError('Invalid token'));
  }
  const { error, token }: Token = verifyToken(jwtToken.split(' ')[1]);
  if (error) {
    return next(new AuthenticationError('Invalid token'));
  }
  const tokenData = token as UserRequest;
  merge(req, { identity: token });
  if (tokenData.role === 'Admin') {
    return next();
  }
  return next(new AuthorizationError('You are not authorized'));
};
