import { Refresh_session } from '../../models/index.js';
import hashRefreshToken from './token/hasRefreshToken.js';

export default async function logoutUser(refreshToken) {
  const tokenHash = hashRefreshToken(refreshToken);

  const session = await Refresh_session.findOne({
    where: {
      token_hash: tokenHash,
      revoked_at: null,
    },
  });

  if (!session) {
    return;
  }

  await session.update({
    revoked_at: new Date(),
  });
}
