// eslint-disable-next-line @typescript-eslint/no-explicit-any
const globalAny = global;
import { PrismaClient } from '@prisma/client';
if (!globalAny.__db) {
    globalAny.__db = new PrismaClient();
}
const client = globalAny.__db;
export default client;
//# sourceMappingURL=client.js.map