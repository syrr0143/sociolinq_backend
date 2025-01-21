// utils/errorHandler.js

import { CustomError, apiResponse } from "./customResponse.js";

const errorHandler = (err, req, res, next) => {
  if (err instanceof CustomError) {
    console.log("error", err);
    return apiResponse.error(res, err.message, err.statusCode);
  }
  console.error(err);
  return apiResponse.error(res, "Something went wrong", 500);
};

export default errorHandler;
