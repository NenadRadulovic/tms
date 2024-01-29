import { Request, Response } from 'express';
import { generateJWT } from '../helpers/generate-jwt-token';
import { UserDTO } from '../common/user-types';
import userService from '@services/userService';
import { get } from 'lodash-es';
import { User } from '@prisma/client';

export const register = async (req: Request, res: Response) => {
  try {
    const userData: User = req.body;
    const newUser = await userService.createUser(userData);
    if (newUser === undefined) {
      return res
        .status(400)
        .json({ errorMessage: 'failed to create new user' });
    }
    return res.status(201).json({ registered: 'success', user: newUser });
  } catch (err) {
    return res.status(400).json({ errorMessage: err });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const userData: UserDTO = req.body;
    const user = await userService.getUserWhere(
      userData.email,
      userData.password,
    );
    if (user === undefined) {
      return res.status(400).json({ errorMessage: 'invalid credentials' });
    }
    const token = generateJWT(user);
    return res.status(200).json({ loggedIn: 'success', token });
  } catch (err) {
    return res.status(400).json({ errorMessage: err });
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
