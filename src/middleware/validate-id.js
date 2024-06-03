var mongoose = require("mongoose");
function validate_id(req, res, next) {
  var isValid = mongoose.Types.ObjectId.isValid(req.params.id);
  if (!isValid) {
    return res.status(400).json({
      Succcess: false,
      error: "Id is incorrect.",
    });
  } else if (isValid) {
    next();
  }
}

module.exports = { validate_id };
