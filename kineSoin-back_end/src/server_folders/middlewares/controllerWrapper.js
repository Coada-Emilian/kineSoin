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
