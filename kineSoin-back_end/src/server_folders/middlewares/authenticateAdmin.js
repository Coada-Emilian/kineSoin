// Purpose: Middleware to authenticate admin users.

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
