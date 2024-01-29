import client from '../prisma/client.js';
import { isNull } from 'lodash-es';
const createUser = async (userData) => {
    try {
        const newUser = await client.user.create({ data: userData });
        return newUser;
    }
    catch (e) {
        return undefined;
    }
};
const getUserById = async (userId) => {
    try {
        const user = await client.user.findUnique({ where: { id: userId } });
        if (isNull(user)) {
            return undefined;
        }
        return user;
    }
    catch (e) {
        return undefined;
    }
};
export const user = {
    createUser,
    getUserById,
};
//# sourceMappingURL=user.js.map