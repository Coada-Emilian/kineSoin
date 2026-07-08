import { Refresh_session } from '../../models/index.js';
import hashRefreshToken from '../../services/authentication/token/hasRefreshToken.js';
import { createAccessToken, verifyRefreshToken } from './token/tokenService.js';

export default async function refreshAccessToken(refreshToken) {
  const decoded = verifyRefreshToken(refreshToken);

  const tokenHash = hashRefreshToken(refreshToken);

  const session = await Refresh_session.findOne({
    where: {
      token_hash: tokenHash,
      revoked_at: null,
    },
  });

  if (!session) {
    const err = new Error('Refresh session not found.');
    err.statusCode = 403;
    throw err;
  }

  if (new Date() > session.expires_at) {
    const err = new Error('Refresh session expired.');
    err.statusCode = 403;
    throw err;
  }

  await session.update({
    last_used_at: new Date(),
  });

  const accessToken = createAccessToken({
    id: decoded.id,
    role: decoded.role,
  });

  return {
    accessToken,
    user: {
      id: decoded.id,
      role: decoded.role,
    },
  };
}
