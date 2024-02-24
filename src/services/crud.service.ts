/* eslint-disable @typescript-eslint/no-explicit-any */
import client from '@dbPrisma/client';
import { internalServerError } from 'src/common/error.common';
import {
  CreateEntityData,
  CreateReturnData,
  DeleteEntityData,
  DeleteReturnData,
  EntityName,
  FindEntityData,
  FindManyEntityData,
  FindManyReturnData,
  FindReturnData,
  UpdateEntityData,
  UpdateReturnData,
} from 'src/types/service.types';

export async function createEntity<T extends EntityName>(
  entityType: T,
  args: CreateEntityData<T>,
): Promise<CreateReturnData<T>> {
  if (!client[entityType]?.create) {
    throw new Error(`Invalid entity type: ${entityType}`);
  }

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  return await client[entityType].create({ ...args });
}

export async function updateEntity<T extends EntityName>(
  entityType: T,
  args: UpdateEntityData<T>,
): Promise<UpdateReturnData<T>> {
  if (!client[entityType]?.update) {
    throw new Error(`Invalid entity type: ${entityType}`);
  }
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  const result = await client[entityType].update({ ...args });

  return result;
}

export async function findEntity<T extends EntityName>(
  entityType: T,
  args: FindEntityData<T>,
): Promise<FindReturnData<T>> {
  if (!client[entityType]?.findUnique) {
    throw new Error(`Invalid entity type: ${entityType}`);
  }
  try {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    return await client[entityType].findUnique({ ...args });
  } catch (err) {
    throw new internalServerError('Prisma error');
  }
}

export async function findManyEntities<T extends EntityName>(
  entityType: T,
  args?: FindManyEntityData<T>,
): Promise<FindManyReturnData<T>> {
  if (!client[entityType]?.findMany) {
    throw new Error(`Invalid entity type: ${entityType}`);
  }
  try {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    return await client[entityType].findMany({ ...args });
  } catch (err) {
    throw new internalServerError('Prisma error');
  }
}

export async function deleteEntity<T extends EntityName>(
  entityType: T,
  args: DeleteEntityData<T>,
): Promise<DeleteReturnData<T>> {
  if (!client[entityType]?.delete) {
    throw new Error(`Invalid entity type: ${entityType}`);
  }
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  return await client[entityType].delete({ ...args });
}
