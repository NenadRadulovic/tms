/* eslint-disable @typescript-eslint/no-explicit-any */
import client from '@dbPrisma/client';
import {
  BadRequestError,
  InternalServerError,
  NotFoundError,
} from 'src/common/error.common';
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
    throw new InternalServerError(`Invalid entity type: ${entityType}`);
  }

  try {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    return await client[entityType].create({ ...args });
  } catch (err) {
    throw new BadRequestError(`Failed to create entity ${entityType}`);
  }
}

export async function updateEntity<T extends EntityName>(
  entityType: T,
  args: UpdateEntityData<T>,
): Promise<UpdateReturnData<T>> {
  if (!client[entityType]?.update) {
    throw new InternalServerError(`Invalid entity type: ${entityType}`);
  }

  try {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    return await client[entityType].update({ ...args });
  } catch (err) {
    throw new NotFoundError(`Entity not Found ${entityType}`);
  }
}

export async function findEntity<T extends EntityName>(
  entityType: T,
  args: FindEntityData<T>,
): Promise<FindReturnData<T>> {
  if (!client[entityType]?.findUnique) {
    throw new InternalServerError(`Invalid entity type: ${entityType}`);
  }
  try {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    return await client[entityType].findUnique({ ...args });
  } catch (err) {
    throw new InternalServerError('Prisma error');
  }
}

export async function findManyEntities<T extends EntityName>(
  entityType: T,
  args?: FindManyEntityData<T>,
): Promise<FindManyReturnData<T>> {
  if (!client[entityType]?.findMany) {
    throw new InternalServerError(`Invalid entity type: ${entityType}`);
  }
  try {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    return await client[entityType].findMany({ ...args });
  } catch (err) {
    throw new NotFoundError(`Entity not Found ${entityType}`);
  }
}

export async function deleteEntity<T extends EntityName>(
  entityType: T,
  args: DeleteEntityData<T>,
): Promise<DeleteReturnData<T>> {
  if (!client[entityType]?.delete) {
    throw new InternalServerError(`Invalid entity type: ${entityType}`);
  }
  try {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    return await client[entityType].delete({ ...args });
  } catch (err) {
    throw new NotFoundError(`Entity not Found ${entityType}`);
  }
}
