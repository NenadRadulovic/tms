/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Response, Request } from 'express';
import { ERROR_NAMES, RequestError } from 'src/common/error.common';
import logger from 'src/common/logger.common';

export const errorMiddleware = (
  err: RequestError,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  // if (err.name === ERROR_NAMES.internalServerError) {
  //   logger.log('fatal', err.message);
  // } else {
  //   logger.log('error', err.message);
  // }
  return res
    .setHeader('Content-Type', 'application/json')
    .status(err.statusCode)
    .json({ message: err.message, name: err.name });
};
