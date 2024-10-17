// Purpose: Middleware to check if the user is logged in.

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
