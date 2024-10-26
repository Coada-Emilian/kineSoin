/**
 * @fileoverview This module exports a middleware function designed to wrap
 * controller functions. It catches any errors that occur during the
 * execution of the controller and sends a standardized error response
 * with a 500 status code and a user-friendly message.
 *
 * The `controllerWrapper` function serves as an error-handling layer for
 * asynchronous controller functions, ensuring that uncaught exceptions
 * are logged and properly handled without crashing the server.
 *
 * @module ControllerWrapper
 *
 * @param {Function} callback - The controller function to be wrapped.
 *                              This function should take the standard
 *                              Express request, response, and next parameters.
 * @returns {Function} A middleware function that calls the provided
 *                    controller and handles any errors that may occur.
 */

export function controllerWrapper(callback) {
  return async (req, res, next) => {
    try {
      await callback(req, res, next);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: 'An error occurred. Please try again later.' });
      next(error);
    }
  };
}
