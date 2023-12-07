import jwt from "jsonwebtoken";
const createToken = (id, email, expiresIn) => {
    const payload = { id, email };
    const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
        expiresIn,
    });
    return token;
};
export { createToken };
//# sourceMappingURL=create-token.js.map