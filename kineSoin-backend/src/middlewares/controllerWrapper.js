/**
 * @description Wraps async controllers to provide consistent error handling.
 *
 * Rationale:
 * - Prevents unhandled promise rejections by centralizing try/catch logic.
 * - Ensures controllers stay focused on business logic instead of boilerplate error handling.
 *
 * Notes:
 * - Logs full errors in development for easier debugging.
 * - Sends a safe generic message to clients while still passing the error to Express
 *   for unified logging or custom error middleware.
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
