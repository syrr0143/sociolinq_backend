import logger from '../utils/logger.js'
class AppError extends Error {

  constructor(message, statusCode = 500, details= null) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true; // to Differentiates operational errors from programming errors
    this.details = details;
    Error.captureStackTrace(this, this.constructor);
  }
}

const errorHandler = (err, req, res, next) => {
  
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal server error";

  if (err.isOperational && err.details) { 
     logger.warn(`[${req.method}] ${req.url} - ${message}`, {
       details: err.details,
     });
  } else {
    logger.error(`[${req.method}] ${req.url} - ${message}`, {
      stack: err.stack,
    });
  }

  res.status(statusCode).json({
    success: false,
    status: statusCode,
    message,
    ...(process.env.NODE_ENV !== "production" && { stack: err.stack }),
  });
};

export { AppError, errorHandler };
