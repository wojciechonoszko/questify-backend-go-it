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
const JWTStrategy = require("passport-jwt").Strategy;
const { ExtractJwt } = require("passport-jwt");
const SECRET_KEY = process.env.JWT_SECRET_KEY;

passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJwt.fromHeader("authorization"),
      secretOrKey: SECRET_KEY,
    },
    async (payload, done) => {
      try {
        // Pobierz użytkownika z bazy danych po ID
        const user = await User.findById(payload.id);

        // Jeśli użytkownik nie istnieje, zwróć błąd
        if (!user) {
          return done(null, false);
        }

        // Jeśli użytkownik istnieje, dodaj go do obiektu request jako req.user
        done(null, user);
      } catch (error) {
        done(error, false);
      }
    }
  )
);