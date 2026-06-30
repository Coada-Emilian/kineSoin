/**
 * @description Sanitizes string fields in the request body.
 *
 * Rationale:
 * - Prevents HTML/script injection by cleaning user‑provided strings before they reach
 *   controllers or the database.
 *
 * Notes:
 * - Only string fields are sanitized to avoid corrupting structured data.
 * - Errors fall back to a safe 500 response to avoid leaking internal details.
 */

import sanitize from 'sanitize-html';

export const sanitizeRequestBody = (req, res, next) => {
  try {
    Object.keys(req.body).forEach((key) => {
      if (typeof req.body[key] === 'string') {
        req.body[key] = sanitize(req.body[key]);
      }
    });
    next();
  } catch (error) {
    console.error('Error sanitizing request body:', error);
    res
      .status(500)
      .json({ message: 'Server error during input sanitization.' });
  }
};
