/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from 'express';
import { generateJWT } from '../helpers/generate-jwt-token';
import { UserDTO } from '../common/user-types';
import userService from '@services/user.service';
import { get } from 'lodash-es';
import { User } from '@prisma/client';

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
    const userData: User = req.body;
    const user = await userService.getUserWhere(
      userData.email,
      userData.password,
    );
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
