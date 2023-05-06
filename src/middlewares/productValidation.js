const checkKeys = (req, res, next) => {
  const { id } = req.params;
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({
      message: '"name" is required',
    });
  }
  if (!id) {
    return res.status(400).json({
      message: '"id" is required',
    });
  }
  if (name.length < 5) {
    return res.status(422).json({
      message: '"name" length must be at least 5 characters long',
    });
  }
  
  return next();
};

module.exports = {
  checkKeys,
};