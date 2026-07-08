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

export function createRefreshToken(payload) {
  return jsonwebtoken.sign(payload, process.env.REFRESH_TOKEN_KEY, {
    expiresIn: '30d',
    algorithm: 'HS256',
  });
}
