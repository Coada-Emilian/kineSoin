/**
 * @description Middleware to sanitize user input by cleaning all string properties in the request body using the sanitize-html library, with enhanced error handling.
 *
 * This module:
 * - Iterates over all keys in the request body.
 * - Checks if each key's value is a string.
 * - Uses the sanitize-html library to clean the string values, removing any potentially harmful HTML or script content.
 * - Updates the request body with the sanitized values.
 * - Proceeds to the next middleware or route handler if successful.
 * - Logs any errors encountered during sanitization and returns a 500 status with an error message.
 *
 * Ensure that the sanitize-html module is installed before using this middleware.
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
