import { User } from '@prisma/client';
import client from '../prisma/client';
import { isNull } from 'lodash-es';

const createUser = async (userData: User): Promise<User | undefined> => {
  try {
    const newUser = await client.user.create({ data: userData });
    return newUser;
  } catch (e) {
    return undefined;
  }
};

const getUserById = async (userId: number): Promise<User | undefined> => {
  try {
    const user = await client.user.findUnique({ where: { id: userId } });
    if (isNull(user)) {
      return undefined;
    }
    return user;
  } catch (e) {
    return undefined;
  }
};

export const user = {
  createUser,
  getUserById,
};
