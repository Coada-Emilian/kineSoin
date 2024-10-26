/**
 * @fileoverview This module exports a middleware function that sanitizes
 * the request body to prevent Cross-Site Scripting (XSS) attacks. It
 * processes all string fields in the request body, applying sanitation
 * to remove potentially harmful HTML and script elements.
 *
 * The middleware iterates over each key in the `req.body` object. If a
 * value is a string, it uses the `sanitize-html` library to clean the
 * input before proceeding to the next middleware or route handler.
 *
 * @module BodySanitizer
 * @requires sanitize-html
 *
 * @param {Object} req - The request object containing the body to sanitize.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function in the stack.
 */

import sanitize from 'sanitize-html';

export const bodySanitizer = (req, res, next) => {
  Object.keys(req.body).forEach((key) => {
    if (typeof req.body[key] === 'string') {
      req.body[key] = sanitize(req.body[key]);
    }
  });
  next();
};
