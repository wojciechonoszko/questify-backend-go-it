const passport = require("passport");
const { httpStatusCodes } = require("../helpers/httpstatuscodes");
require("../config/passport");

const guard = (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (err, user) => {
    const token = req.get("Authorization")
      ? req.get("Authorization")?.split(" ")[1]
      : null;
    if (err || !user || token !== user.token) {
      return res.status(httpStatusCodes.FORBIDDEN).json({
        status: "error",
        code: httpStatusCodes.FORBIDDEN,
        message: "Access denied",
        result: "Forbidden",
      });
    }
    req.user = user;
    return next();
  })(req, res, next);
};

module.exports = guard;
