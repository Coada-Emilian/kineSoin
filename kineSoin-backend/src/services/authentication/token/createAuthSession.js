import { Refresh_session } from '../../../models/index.js';
import hashRefreshToken from './hasRefreshToken.js';
import { createAccessToken, createRefreshToken } from './tokenService.js';

export default async function createAuthSession({
  id,
  role,
  admin_id = null,
  therapist_id = null,
  patient_id = null,
}) {
  const payload = {
    id,
    role,
  };

  const accessToken = createAccessToken(payload);
  const refreshToken = createRefreshToken(payload);

  const tokenHash = hashRefreshToken(refreshToken);

  await Refresh_session.create({
    admin_id,
    therapist_id,
    patient_id,
    token_hash: tokenHash,
    expires_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
  });

  return {
    accessToken,
    refreshToken,
  };
}
