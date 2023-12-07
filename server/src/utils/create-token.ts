import jwt from "jsonwebtoken";

const createToken = (id: string, email: string, expiresIn: string | number) => {
  const payload = { id, email };
  const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
    expiresIn,
  });

  return token;
};

export { createToken };
