import { apiResponse } from "../utils/customResponse.js";

const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  apiResponse.error(
    res,
    message,
    statusCode,
    process.env.NODE_ENV === "production" ? [] : err.stack
  );
};

export default errorHandler;
