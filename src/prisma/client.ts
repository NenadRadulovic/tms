const globalAny: any = global;

import { PrismaClient } from '@prisma/client';

declare global {
  let __db: PrismaClient | undefined;
}

if (!globalAny.__db) {
  globalAny.__db = new PrismaClient();
}

const client: PrismaClient = globalAny.__db;

export default client;
