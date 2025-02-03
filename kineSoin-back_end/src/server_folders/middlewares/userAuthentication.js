/**
 * @description Provides middleware functions to authenticate admin, patient, and therapist users by verifying JWT tokens provided in the request headers.
 *
 * This file includes:
 * - authenticateAdmin: Middleware function to authenticate admin users.
 *   - Extracts the JWT token from the "Authorization" header.
 *   - Verifies the token using the secret key from the environment variables.
 *   - If the token is valid, decodes the token and extracts the admin_id.
 *   - Sets the admin_id in the request object for further processing.
 *   - Proceeds to the next middleware or route handler if the token is valid.
 * - authenticatePatient: Middleware function to authenticate patient users.
 *   - Extracts the JWT token from the "Authorization" header.
 *   - Verifies the token using the secret key from the environment variables.
 *   - If the token is valid, decodes the token and extracts the patient_id.
 *   - Sets the patient_id in the request object for further processing.
 *   - Proceeds to the next middleware or route handler if the token is valid.
 * - authenticateTherapist: Middleware function to authenticate therapist users.
 *   - Extracts the JWT token from the "Authorization" header.
 *   - Verifies the token using the secret key from the environment variables.
 *   - If the token is valid, decodes the token and extracts the therapist_id.
 *   - Sets the therapist_id in the request object for further processing.
 *   - Proceeds to the next middleware or route handler if the token is valid.
 *
 * Ensure that the jsonwebtoken module is installed and that the environment variable TOKEN_KEY is set before using these middleware functions.
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
