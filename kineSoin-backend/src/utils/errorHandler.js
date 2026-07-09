export function errorHandler(err, req, res, next) {
  const statusCode = err.statusCode || 500;

  if (process.env.NODE_ENV === 'development') {
    if (statusCode >= 500) {
      console.error(err);
    } else {
      console.warn(`${statusCode} - ${err.message}`);
    }
  }

  return res.status(statusCode).json({
    message: err.message || 'Internal server error',
  });
}
