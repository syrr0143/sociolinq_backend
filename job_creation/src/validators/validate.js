export const validate = (schema) => {
  return (req, res, next) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      const errors = result.error.errors.map((err) => ({
        path: err.path.join("."), // Path of the field
        message: err.message, // Error message
      }));

      return res.status(400).json({ success: false, errors });
    }

    req.body = result.data;
    next();
  };
};
