import { isNull, isUndefined } from 'lodash-es';
import { BadRequestError, NotFoundError } from 'src/common/error.common';
import { UserRequest, UserResponse } from 'src/dtos/user.dto';
import { checkPassword, hashPassword } from 'src/helpers/crypto.helper';
import { EntityName } from 'src/types/service.types';
import {
  createEntity,
  deleteEntity,
  findEntity,
  findManyEntities,
  updateEntity,
} from './crud.service';

const model: EntityName = 'user';

const createUser = async (userData: UserRequest): Promise<UserResponse> => {
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

const getUserById = async (userId: number): Promise<UserResponse> => {
  const user = await findEntity(model, {
    where: { id: userId },
  });
  if (isNull(user)) {
    throw new BadRequestError(`User with id ${userId} doesnt exist`);
  }
  return user;
};

const login = async (
  email: string,
  password: string,
): Promise<UserResponse> => {
  const user = await findEntity(model, { where: { email } });
  const isPasswordCorrect = await checkPassword(
    password,
    user?.password as string,
  );
  if (isNull(user) || isUndefined(user) || !isPasswordCorrect) {
    throw new NotFoundError('Failed to login. Invalid credentials.');
  }
  return user;
};

const updateUser = async (
  userId: number,
  userData: UserRequest,
): Promise<UserResponse> => {
  const user = await updateEntity(model, {
    where: { id: userId },
    data: { ...userData, password: await hashPassword(userData.password) },
  });
  return user;
};
const getAllUsers = async (): Promise<UserResponse[]> => {
  const users = await findManyEntities(model);
  return users ?? [];
};
const deleteUser = async (userId: number): Promise<UserResponse> => {
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
  login,
};
