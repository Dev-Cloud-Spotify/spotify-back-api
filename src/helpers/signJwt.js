import jwt from 'jsonwebtoken';

export const signJwt = (payload, secret) => {
  const token = jwt.sign(payload, secret, { expiresIn: 2400 });
  return token;
}