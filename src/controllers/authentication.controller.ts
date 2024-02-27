/* eslint-disable @typescript-eslint/no-unused-vars */
import { UserRequest } from '@dtos/user.dto';
import { User } from '@prisma/client';
import userService from '@services/user.service';
import { NextFunction, Request, Response } from 'express';
import { get } from 'lodash-es';
import { generateJWT } from '../helpers/generate-jwt-token';

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userData: User = req.body;
    const newUser = await userService.createUser(userData);
    return res.status(201).json({ registered: 'success', user: newUser });
  } catch (err) {
    next(err);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userData: UserRequest = req.body;
    const user = await userService.login(userData.email, userData.password);
    const token = generateJWT(user);
    return res.status(200).json({ loggedIn: 'success', token });
  } catch (err) {
    next(err);
  }
};

export const me = async (req: Request, res: Response) => {
  try {
    const user = get(req, 'identity');
    return res.status(200).json({ user });
  } catch (err) {
    return res.status(400).json({ errorMessage: err });
  }
};
