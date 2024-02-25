// test/sample.test.ts
import { BadRequestError } from '@appCommon/error.common';
import client from '@dbPrisma/client';
import { Role } from '@prisma/client';
import userService from '@services/user.service';
import { afterEach, describe, expect, it, vi } from 'vitest';

vi.mock('../prisma/client');

afterEach(async () => {
  await client.$transaction([client.user.deleteMany()]);
});

describe('User Unit tests', async () => {
  it('Creates user OK', async () => {
    const userData = {
      email: 'testuser2@yopmail.com',
      password: 'test123!',
      first_name: 'Test',
      last_name: 'ViTest',
      role: Role.Admin,
    };
    const user = await userService.createUser(userData);
    expect(user).not.toBeNull();
  });
  it('Updated user OK', async () => {
    const userData = {
      email: 'loginUser@yopmail.com',
      password: 'test123!',
      first_name: 'Test',
      last_name: 'ViTest',
    };
    const user = await userService.createUser(userData);
    const updatedUser = await userService.updateUser(user.id, {
      ...userData,
      first_name: 'updateTest',
      last_name: 'ViTestUpdate',
    });
    expect(updatedUser.first_name).not.toBe(user.first_name);
    expect(updatedUser.last_name).not.toBe(user.last_name);
    //Compare updated password it should not match
  });
  it('Gets user by Id OK', async () => {
    const userData = {
      email: 'loginUser@yopmail.com',
      password: 'test123!',
      first_name: 'Test',
      last_name: 'ViTest',
    };
    const user = await userService.createUser(userData);
    const dbUser = await userService.getUserById(user.id);
    expect(dbUser.id).toBe(user.id);
    expect(dbUser.id).not.toBeNull();
  });
  it('Gets all users OK', async () => {
    const userData = [
      {
        email: 'loginUser1@yopmail.com',
        password: 'test123!',
        first_name: 'Test',
        last_name: 'ViTest',
      },
      {
        email: 'loginUser2@yopmail.com',
        password: 'test123!',
        first_name: 'Test',
        last_name: 'ViTest',
      },
      {
        email: 'loginUser3@yopmail.com',
        password: 'test123!',
        first_name: 'Test',
        last_name: 'ViTest',
      },
    ];
    await Promise.all(
      userData.map(async (user) => await userService.createUser(user)),
    );
    const dbUsers = await userService.getAllUsers();
    expect(dbUsers.length).not.toBe(0);
    expect(dbUsers.length).toBe(3);
  });
  it('Deletes user OK', async () => {
    const userData = {
      email: 'loginUser1@yopmail.com',
      password: 'test123!',
      first_name: 'Test',
      last_name: 'ViTest',
    };
    const user = await userService.createUser(userData);
    const deletedUser = await userService.deleteUser(user.id);
    const dbUsers = await userService.getAllUsers();
    expect(deletedUser.id).toBe(deletedUser.id);
    expect(dbUsers.length).toBe(0);
  });
  it('Creates duplicate user NOT OK', async () => {
    const userData = {
      email: 'testuser2@yopmail.com',
      password: 'test123!',
      first_name: 'Test',
      last_name: 'ViTest',
      role: Role.Admin,
    };
    await userService.createUser(userData);
    expect(async () => await userService.createUser(userData)).rejects.toThrow(
      BadRequestError,
    );
  });
});
