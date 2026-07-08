import jsonwebtoken from 'jsonwebtoken';

export function createAccessToken(payload) {
  return jsonwebtoken.sign(payload, process.env.TOKEN_KEY, {
    expiresIn: '3h',
    algorithm: 'HS256',
  });
}

export function verifyAccessToken(token) {
  return jsonwebtoken.verify(token, process.env.TOKEN_KEY);
}
