import refreshAccessTokenService from '../../../../services/authentication/refreshAccessToken.js';

export default async function refreshAccessToken(req, res) {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    const err = new Error('No refresh token provided.');
    err.statusCode = 401;
    throw err;
  }

  const { accessToken, user } = await refreshAccessTokenService(refreshToken);

  return res.status(200).json({
    token: accessToken,
    user,
  });
}
