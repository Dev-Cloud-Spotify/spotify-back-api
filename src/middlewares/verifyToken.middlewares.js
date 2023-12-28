import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

function verifyToken(req, res, next) {
  console.log('verifyToken()'.yellow);
  let token = req.headers.authorization;
  if (!token) {
    return res.status(403).send({
      auth: false,
      token: null,
      message:"Missing token"
    })
  }
  jwt.verify(token, process.env.JWT_SECRET, function (error, jwtDecoded) {
    if (error) {
      return res.status(401).send({
        auth: false,
        token: null,
        message: "non authorized"
      })
    }
    console.log(jwtDecoded);
    req.userToken = jwtDecoded;
    next();
  });
}

export default verifyToken;