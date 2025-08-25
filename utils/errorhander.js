export class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    (this.message = message),
      (this.statusCode = statusCode),
      (this.status = `${statusCode}`.startsWith("4")
        ? "fail"
        : "error"),
      (this.isOperational = true);
  }
}

export const handleError = (err, req, res, next) => {
  (err.statusCode = err.statusCode || 500),
    (err.status = err.status || "error");
  if ("NODE_ENV=development") {
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
      err: err,
      stack: err.stack,
    });
  } else {
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  }
};
