import crypto from 'crypto';

export default function hashRefreshToken(token) {
  return crypto.createHash('sha256').update(token).digest('hex');
}
