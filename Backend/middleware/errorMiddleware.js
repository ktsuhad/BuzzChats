const notFound = (req, res, next) => {
  const error = new Error(`Not Found ${req.originalUrl}`);
  res.status(404);
  next(error);
};

const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.status(404);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? "Full" : err.stack,
  });
};

module.exports = { notFound, errorHandler };
