export const notFound = (_req, _res, next) => {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
};

export const errorHandler = (err, _req, res, _next) => {
  const status = err.status || err.statusCode || 500;
  res.status(status).json({
    error: { message: err.message || "Server Error" },
  });
};
