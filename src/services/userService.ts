import { UserDTO } from '../common/user-types';
import { User } from '@prisma/client';
import client from '@dbPrisma/client';
import { isNull } from 'lodash-es';

//TODO implement DB query calls
const createUser = async (userData: User): Promise<User | undefined> => {
  try {
    const newUser = await client.user.create({
      data: { ...userData, updated_at: new Date(), created_at: new Date() },
    });
    return newUser;
  } catch (e) {
    console.log(e);
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
    console.log(e);
    return undefined;
  }
};

const getUserWhere = async (
  email: string,
  password: string,
): Promise<User | undefined> => {
  try {
    const user = await client.user.findUnique({ where: { email, password } });
    if (isNull(user)) {
      return undefined;
    }
    return user;
  } catch (e) {
    console.log(e);
    return undefined;
  }
};

const updateUser = (userData: UserDTO): UserDTO => {
  return userData;
};
const getAllUsers = (userData: UserDTO): UserDTO[] => {
  return [userData, userData, userData, userData];
};
const deleteUser = (userData: UserDTO): UserDTO => {
  return userData;
};

export default {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  getUserWhere,
};
