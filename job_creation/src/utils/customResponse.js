class CustomError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor);
  }
}

const apiResponse = {
  success: (res, message = "Success", data = {}) => {
    res.status(200).json({
      success: true,
      message,
      data,
    });
  },

  error: (
    res,
    message = "An error occurred",
    statusCode = 500,
    errors = []
  ) => {
    res.status(statusCode).json({
      success: false,
      message,
      errors,
    });
  },

  validationError: (res, errors = [], message = "Validation failed") => {
    res.status(422).json({
      success: false,
      message,
      errors,
    });
  },
};

export {
  apiResponse,
  CustomError,
};
