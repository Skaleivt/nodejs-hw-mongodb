export const errorHandler = (err, req, res, next) => {
  const status = err.status;
  res.status(status).json({
    status,
    message: err.message || 'Internal Server Error',
    data: err.errors || null,
  });

  res.status(500).json({
    message: 'Something went wrong',
    data: err.message,
  });
};
