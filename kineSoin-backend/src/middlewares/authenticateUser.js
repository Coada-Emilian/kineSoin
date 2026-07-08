import { verifyAccessToken } from '../services/authentication/token/tokenService.js';

export default function authenticateUser(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({
      message: 'Access denied. No token provided.',
    });
  }

  try {
    const decoded = verifyAccessToken(token);

    req.user = decoded;

    // Temporary compatibility layer
    // if (decoded.admin_id) {
    //   req.admin_id = decoded.admin_id;
    // }

    if (decoded.patient_id) {
      req.patient_id = decoded.patient_id;
    }

    if (decoded.therapist_id) {
      req.therapist_id = decoded.therapist_id;
    }

    next();
  } catch (err) {
    return res.status(403).json({
      message: 'Invalid token.',
    });
  }
}
