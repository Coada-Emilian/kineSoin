// Purpose: Sanitize the request body to prevent XSS attacks.

import sanitize from 'sanitize-html';

export const bodySanitizer = (req, res, next) => {
  Object.keys(req.body).forEach((key) => {
    if (typeof req.body[key] === 'string') {
      req.body[key] = sanitize(req.body[key]);
    }
  });
  next();
};
