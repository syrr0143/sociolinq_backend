import logger from "../utils/logger.js";

const requestLogger = (req, res, next) => {
  logger.info(`[${req.method}] ${req.url} - Body: ${JSON.stringify(req.body)}`);
  next();
};

module.exports = requestLogger;
