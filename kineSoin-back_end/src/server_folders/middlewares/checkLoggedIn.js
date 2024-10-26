/**
 * @fileoverview This module exports middleware for checking if a user is
 * logged in by verifying the presence and validity of a JSON Web Token
 * (JWT) in the request's authorization header. If the token is missing
 * or invalid, the middleware responds with an appropriate error message.
 *
 * The middleware performs the following checks:
 * 1. It verifies if the request contains an authorization header.
 * 2. If present, it extracts the token from the header and attempts to
 *    verify it using a secret key stored in environment variables.
 * 3. If verification is successful, the user information is extracted
 *    from the token and added to the request object for further
 *    processing in subsequent middleware or route handlers.
 *
 * @module CheckLoggedIn
 * @requires dotenv/config
 * @requires jsonwebtoken
 *
 * @param {Object} req - The request object containing the authorization header.
 * @param {Object} res - The response object used to send error responses.
 * @param {Function} next - The next middleware function in the stack.
 */

import 'dotenv/config';
import jsonwebtoken from 'jsonwebtoken';

export function checkLoggedIn(req, res, next) {
  // Check if the request has an authorization header.
  const authorization = req.headers.authorization;
  if (!authorization) {
    return res
      .status(401)
      .json({ message: 'Access denied. No authentication token provided.' });
  }

  // Check if the authorization header has a valid token.
  const token = authorization.split(' ')[1];
  try {
    // Verify the token and extract the user information.
    const jwtContent = jsonwebtoken.verify(token, process.env.TOKEN_KEY);
    req.user = jwtContent;
  } catch (err) {
    console.error(err);
    return res.status(401).json({
      message:
        'Unauthorized access. Authentication token is missing or invalid.',
    });
  }
  next();
}
