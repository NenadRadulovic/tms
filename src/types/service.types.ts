/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { PrismaClient } from '@prisma/client';

export type CrudOperation = 'create' | 'update' | 'findUnique' | 'delete';

type FilterOutNonModelKeys<T> = {
  [K in keyof T as T[K] extends (...args: any[]) => any ? never : K]: T[K];
};

export type EntityName = Exclude<
  keyof FilterOutNonModelKeys<PrismaClient>,
  symbol
>;

export type CreateEntityData<T extends EntityName> = PrismaClient[T] extends {
  create: (args: { data: infer Data }) => any;
}
  ? {
      data: Data;
    }
  : never;

export type CreateReturnData<T extends EntityName> = PrismaClient[T] extends {
  create: (args: { data: any }) => infer ReturnType;
}
  ? ReturnType
  : never;

export type UpdateEntityData<T extends EntityName> = PrismaClient[T] extends {
  update: (args: { data: infer Data; where: infer Where }) => any;
}
  ? {
      data: Data;
      where: Where;
    }
  : never;

export type UpdateReturnData<T extends EntityName> = PrismaClient[T] extends {
  update: (args: any) => infer ReturnType;
}
  ? ReturnType
  : never;

export type DeleteEntityData<T extends EntityName> = PrismaClient[T] extends {
  delete: (args: { where: infer Where }) => any;
}
  ? { where: Where }
  : never;

export type DeleteReturnData<T extends EntityName> = PrismaClient[T] extends {
  delete: (args: any) => infer ReturnType;
}
  ? ReturnType
  : never;

export type FindEntityData<T extends EntityName> = PrismaClient[T] extends {
  findUnique: (args: { where: infer Where }) => any;
}
  ? {
      where: Where;
    }
  : never;

export type FindReturnData<T extends EntityName> = PrismaClient[T] extends {
  findUnique: (args: any) => infer ReturnType;
}
  ? ReturnType
  : never;

export type FindManyEntityData<T extends EntityName> = PrismaClient[T] extends {
  findMany: (args: { where: infer Where }) => any;
}
  ? {
      where: Where;
    }
  : never;

export type FindManyReturnData<T extends EntityName> = PrismaClient[T] extends {
  findMany: (args: any) => infer ReturnType;
}
  ? ReturnType
  : never;
