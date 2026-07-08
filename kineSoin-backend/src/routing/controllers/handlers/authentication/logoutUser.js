import logoutUserService from '../../../../services/authentication/logoutUser.js';

export default async function logoutUser(req, res) {
  const refreshToken = req.cookies.refreshToken;

  if (refreshToken) {
    await logoutUserService(refreshToken);
  }

  res.clearCookie('refreshToken', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
  });

  return res.status(200).json({
    message: 'Logged out successfully.',
  });
}
