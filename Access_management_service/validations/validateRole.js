import { body, param, query, validationResult } from "express-validator";

const validateRoleCreation = [
  body("name").notEmpty().withMessage("Role name is required"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }
    next();
  },
];
const validateBodyRoleId = [
  body("roleId")
    .custom((value, { req }) => {
      const roleId = Number(value);
      if (isNaN(roleId)) {
        throw new Error("Role ID must be a valid number");
      }
      req.body.roleId = roleId;
      return true;
    })
    .isInt()
    .withMessage("Role ID must be an integer"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }
    next();
  },
];

const validateParamRoleId = [
  param("roleId")
    .custom((value, { req }) => {
      const roleId = Number(value);
      if (isNaN(roleId)) {
        throw new Error("Role ID must be a valid number");
      }
      req.param.roleId = roleId;
      return true;
    })
    .isInt({ min: 1 })
    .withMessage("Role ID must be a positive integer"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

const validateUserSearch = [
  query("email")
    .optional()
    .isEmail()
    .withMessage("Please provide a valid email address."),
  query("id").optional().isInt().withMessage("ID must be a valid integer."),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }
    next();
  },
];
const validateUserRoleAddition = [
  body("userId")
    .isInt()
    .withMessage("User ID must be a valid integer.")
    .notEmpty()
    .withMessage("User ID is required."),
  body("roleId")
    .isInt()
    .withMessage("Role ID must be a valid integer.")
    .notEmpty()
    .withMessage("Role ID is required."),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }
    next();
  },
];

export {
  validateRoleCreation,
  validateBodyRoleId,
  validateParamRoleId,
  validateUserSearch,
  validateUserRoleAddition,
};
