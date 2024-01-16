import jwt from 'jsonwebtoken';

export const signJwt = (payload, secret) => {
  //expire in 1 day
  const token = jwt.sign(payload, secret, { expiresIn: '1d' });
  return token;
}