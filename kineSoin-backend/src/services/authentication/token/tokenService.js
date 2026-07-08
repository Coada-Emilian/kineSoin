import jsonwebtoken from 'jsonwebtoken';

export function createAccessToken(payload) {
  return jsonwebtoken.sign(payload, process.env.TOKEN_KEY, {
    expiresIn: '3h',
    algorithm: 'HS256',
  });
}
