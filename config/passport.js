// const { UsersService } = require("../services");
// const passport = require("passport");
// const { Strategy, ExtractJwt } = require("passport-jwt");
// const { httpStatusCodes } = require("../helpers/httpstatuscodes");
// require("dotenv").config();
// const SECRET_KEY = process.env.JWT_SECRET_KEY;

// const params = {
//   jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//   secretOrKey: SECRET_KEY,
// };

// passport.use(
//   new Strategy(params, async (payload, done) => {
//     try {
//       const service = new UsersService();
//       const user = await service.findById(payload.id);
//       if (!user) {
//         return done(
//           new Error({
//             status: "error",
//             code: httpStatusCodes.NOT_FOUND,
//             message: "Not Found User",
//             result: "Not Found",
//           })
//         );
//       }
//       if (!user.token) {
//         return done(null, false);
//       }
//       return done(null, user);
//     } catch (error) {
//       done(error, false);
//     }
//   })
// );



// ============================================

const passport = require("passport");
const jwt = require("jsonwebtoken");

const passportJWT = require('passport-jwt');
const User = require("../schemas/user");
const ExtractJWT = passportJWT.ExtractJwt;
const Strategy = passportJWT.Strategy;
const secret = process.env.JWT_SECRET_KEY;

const params = {
  secretOrKey: secret,
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
}
passport.use(
  new Strategy(params, function (payload, done) {

    User.findOne({ _id: payload._id }).then((user) => {
    if (!user) {
      return done(new Error("User not found!"));
    }
    return done(null,user)
  })
    .catch((e) => {
    done(e)
  })
  
})
)
