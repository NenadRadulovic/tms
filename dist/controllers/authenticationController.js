import { generateJWT } from '../helpers/generate-jwt-token.js';
import userService from '../services/userService.js';
import { get } from 'lodash-es';
export const register = async (req, res) => {
    try {
        const userData = req.body;
        const newUser = await userService.createUser(userData);
        if (newUser === undefined) {
            return res
                .status(400)
                .json({ errorMessage: 'failed to create new user' });
        }
        return res.status(201).json({ registered: 'success', user: newUser });
    }
    catch (err) {
        return res.status(400).json({ errorMessage: err });
    }
};
export const login = async (req, res) => {
    try {
        const userData = req.body;
        const user = await userService.getUserWhere(userData.email, userData.password);
        if (user === undefined) {
            return res.status(400).json({ errorMessage: 'invalid credentials' });
        }
        const token = generateJWT(user);
        return res.status(200).json({ loggedIn: 'success', token });
    }
    catch (err) {
        return res.status(400).json({ errorMessage: err });
    }
};
export const me = async (req, res) => {
    try {
        const user = get(req, 'identity');
        return res.status(200).json({ user });
    }
    catch (err) {
        return res.status(400).json({ errorMessage: err });
    }
};
//# sourceMappingURL=authenticationController.js.map