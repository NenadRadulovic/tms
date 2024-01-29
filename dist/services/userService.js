import client from '../prisma/client.js';
import { isNull } from 'lodash-es';
//TODO implement DB query calls
const createUser = async (userData) => {
    try {
        const newUser = await client.user.create({
            data: { ...userData, updated_at: new Date(), created_at: new Date() },
        });
        return newUser;
    }
    catch (e) {
        console.log(e);
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
        console.log(e);
        return undefined;
    }
};
const getUserWhere = async (email, password) => {
    try {
        const user = await client.user.findUnique({ where: { email, password } });
        if (isNull(user)) {
            return undefined;
        }
        return user;
    }
    catch (e) {
        console.log(e);
        return undefined;
    }
};
const updateUser = (userData) => {
    return userData;
};
const getAllUsers = (userData) => {
    return [userData, userData, userData, userData];
};
const deleteUser = (userData) => {
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
//# sourceMappingURL=userService.js.map