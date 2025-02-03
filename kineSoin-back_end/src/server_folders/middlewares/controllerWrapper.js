/**
 * @description Middleware to wrap controller functions to catch and handle errors during asynchronous operations.
 *
 * This module:
 * - Accepts a controller function as a callback.
 * - Returns a new function that wraps the controller function in a try-catch block.
 * - Calls the controller function with the request, response, and next parameters.
 * - Catches any errors thrown by the controller function.
 *   - Logs the error to the console if in development mode.
 *   - Sends a 500 status response with a generic or custom error message.
 *   - Passes the error to the next middleware function for further handling.
 *
 * This middleware helps to centralize error handling, ensuring consistent responses and preventing unhandled exceptions.
 */
export function controllerWrapper(
  callback,
  errorMessage = 'An error occurred. Please try again later.'
) {
  return async (req, res, next) => {
    try {
      await callback(req, res, next);
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error('Controller error:', error);
      }
      res.status(500).json({ message: errorMessage });
      next(error);
    }
  };
}
