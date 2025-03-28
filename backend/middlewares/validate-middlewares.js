const validate = (schema) => (req, res, next) => {
  const result = schema.safeParse(req.body);
  if (!result.success) {
    return res.status(422).json({
      status: 422,
      message: "Fill the input properly",
      extraDetails: result.error.errors.map((err) => err.message),
    });
  }
  next();
};

module.exports = validate;
