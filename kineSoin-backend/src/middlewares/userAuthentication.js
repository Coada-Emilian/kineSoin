/**
 * @description Authenticates admins, patients, and therapists via JWT.
 *
 * Rationale:
 * - Keeps role‑based access control simple by exposing dedicated middlewares for each user type.
 * - Extracts IDs directly from verified tokens so downstream controllers can trust identity
 *   without re‑parsing or re‑validating credentials.
 *
 * Notes:
 * - Uses Bearer tokens from the Authorization header.
 * - Invalid or missing tokens return safe 401/403 responses to avoid leaking internal details.
 */

import jwt from 'jsonwebtoken';

export const authenticateAdmin = async (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1]; // Assumes Bearer token

  if (!token) {
    return res
      .status(401)
      .json({ message: 'Access denied. No token provided.' });
  } else {
    jwt.verify(token, process.env.TOKEN_KEY, (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: 'Invalid token.' });
      }
      req.admin_id = decoded.admin_id; // Set admin_id in the request object
      next();
    });
  }
};

export const authenticatePatient = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) {
    return res
      .status(401)
      .json({ message: 'Access denied. No token provided.' });
  } else {
    jwt.verify(token, process.env.TOKEN_KEY, (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: 'Invalid token.' });
      }

      req.patient_id = decoded.patient_id;
      next();
    });
  }
};

export const authenticateTherapist = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) {
    return res
      .status(401)
      .json({ message: 'Access denied. No token provided.' });
  } else {
    jwt.verify(token, process.env.TOKEN_KEY, (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: 'Invalid token.' });
      }

      req.therapist_id = decoded.therapist_id;
      next();
    });
  }
};
