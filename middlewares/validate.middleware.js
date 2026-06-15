const validate = (schema) => {
  return (req, res, next) => {
    //  console.log('Validation Middleware Running');
    try {
      schema.parse(req.body);

      next();
    } catch (error) {
      return res.status(400).json({
        success: false,
        errors: error.issues.map((issue) => ({
          message: issue.message,
        })),
      });
    }
  };
};

module.exports = validate;
