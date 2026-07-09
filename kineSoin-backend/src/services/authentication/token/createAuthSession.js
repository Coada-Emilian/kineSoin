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

  const sessionData = {
    token_hash: tokenHash,
    expires_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
  };

  switch (role) {
    case 'ADMIN':
      sessionData.admin_id = id;
      break;

    case 'THERAPIST':
      sessionData.therapist_id = id;
      break;

    case 'PATIENT':
      sessionData.patient_id = id;
      break;

    default:
      throw new Error(`Unsupported role: ${role}`);
  }

  await Refresh_session.create(sessionData);

  return {
    accessToken,
    refreshToken,
  };
}
