import jwt from "jsonwebtoken";
const secret = process.env.JWT_SECRET || "secret";
export const generateJWT = (user) => {
    const tokenData = {
        ...user,
    };
    const token = jwt.sign(tokenData, secret);
    return token;
};
export const verifyToken = (token) => {
    try {
        return {
            token: jwt.verify(token, secret),
            error: null,
        };
    }
    catch (err) {
        return {
            token: null,
            error: "Invalid token",
        };
    }
};
//# sourceMappingURL=generate-jwt-token.js.map