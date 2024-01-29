import { verifyToken } from '../helpers/generate-jwt-token.js';
import { merge } from 'lodash-es';
export const IsAuthenticated = async (req, res, next) => {
    const accessToken = req.headers.authorization || '';
    const { error, token } = verifyToken(accessToken.split(' ')[1]);
    merge(req, { identity: token });
    if (error) {
        return res.status(403).json({ error });
    }
    next();
};
//# sourceMappingURL=guard.js.map