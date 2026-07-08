export default function refreshAccessToken(refreshToken) {
  const decoded = verifyRefreshToken(refreshToken);

  return createAccessToken({ id: decoded.id, role: decoded.role });
}
