import { User } from '@prisma/client';
import { isNull, isUndefined } from 'lodash-es';
import {
  createEntity,
  deleteEntity,
  findEntity,
  findManyEntities,
  updateEntity,
} from './crud.service';
import { EntityName } from 'src/types/service.types';
import { BadRequestError, NotFoundError } from 'src/common/error.common';
import { hashPassword } from 'src/helpers/crypto.helper';
const model: EntityName = 'user';

const createUser = async (userData: User): Promise<User> => {
  const newUser = await createEntity(model, {
    data: {
      ...userData,
      password: await hashPassword(userData.password),
      updated_at: new Date(),
      created_at: new Date(),
    },
  });
  return newUser;
};

const getUserById = async (userId: number): Promise<User> => {
  const user = await findEntity(model, {
    where: { id: userId },
  });
  if (isNull(user)) {
    throw new BadRequestError(`User with id ${userId} doesnt exist`);
  }
  return user;
};

const getUserWhere = async (email: string, password: string): Promise<User> => {
  const user = await findEntity(model, { where: { email, password } });
  if (isNull(user) || isUndefined(user)) {
    throw new NotFoundError('Failed to login. Invalid credentials.');
  }
  return user;
};

const updateUser = async (userId: number, userData: User): Promise<User> => {
  const user = await updateEntity(model, {
    where: { id: userId },
    data: { ...userData },
  });
  return user;
};
const getAllUsers = async (): Promise<User[]> => {
  const users = await findManyEntities(model);
  return users ?? [];
};
const deleteUser = async (userId: number): Promise<User> => {
  const user = await deleteEntity(model, { where: { id: userId } });
  if (isNull(user)) {
    throw new NotFoundError(`Failed to delete user with id: ${userId}`);
  }
  return user;
};

export default {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  getUserWhere,
};
