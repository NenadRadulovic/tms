import jwt from "jsonwebtoken";
import { Token, TokenData } from "../common/user-types";
import { randomInt } from "crypto";
import { User } from "@prisma/client";

const secret = process.env.JWT_SECRET || "secret";

export const generateJWT = (user: User) => {
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
      error: "Invalid token",
    };
  }
};
