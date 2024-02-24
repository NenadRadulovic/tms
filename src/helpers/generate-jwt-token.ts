import { Token, TokenData } from '@appTypes/token.types';
import jwt from 'jsonwebtoken';
import { UserRequest, UserResponse } from 'src/dtos/user.dto';

const secret = process.env.JWT_SECRET || 'secret';

export const generateJWT = (user: UserRequest | UserResponse) => {
  const tokenData: TokenData = {
    ...user,
  };
  const token = jwt.sign(tokenData, secret);
  return token;
};

export const verifyToken = (token: string): Token => {
  try {
    return {
      token: jwt.verify(token, secret),
      error: null,
    };
  } catch (err) {
    return {
      token: null,
      error: 'Invalid token',
    };
  }
};
