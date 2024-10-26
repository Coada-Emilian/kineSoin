/**
 * @fileoverview This module exports a middleware function for authenticating
 * admin users using JSON Web Tokens (JWT). It verifies the token provided in
 * the request headers to ensure that only authorized admins can access
 * protected routes.
 *
 * The middleware function checks for the presence of a Bearer token in the
 * `Authorization` header. If the token is missing or invalid, it responds
 * with an appropriate error message and status code:
 * - 401 Unauthorized if no token is provided.
 * - 403 Forbidden if the token is invalid.
 *
 * If the token is valid, the admin's ID is extracted from the decoded token
 * and added to the request object, allowing subsequent middleware or route
 * handlers to access it.
 *
 * @module AuthMiddleware
 * @requires jsonwebtoken
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function in the stack.
 */

import jwt from 'jsonwebtoken';

export const authenticateAdmin = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1]; // Assumes Bearer token

  if (!token) {
    return res
      .status(401)
      .json({ message: 'Access denied. No token provided.' });
  }

  jwt.verify(token, process.env.TOKEN_KEY, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token.' });
    }

    req.admin_id = decoded.admin_id; // Set admin_id in the request object
    next();
  });
};
