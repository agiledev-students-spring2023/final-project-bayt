const mongoose = require("mongoose")
const ObjectId = mongoose.Types.ObjectId
const userModel = require("../models/users.model.js")

const passportJWT = require("passport-jwt")
const passport = require("passport")
const ExtractJwt = passportJWT.ExtractJwt
const JwtStrategy = passportJWT.Strategy

// set up JWT authentication options for passport
let jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("jwt"), // look for the Authorization request header
  secretOrKey: process.env.JWT_SECRET,
}

// payload of JWT token
const jwtVerifyToken = async function (jwt_payload, next) {
  // console.log("JWT payload received", jwt_payload) // debugging

  // find user in the database
  const userId = new ObjectId(jwt_payload.id) // convert the string id to an ObjectId
  const user = await userModel.findOne({ _id: userId }).exec()

  // Populate user house and ass
  if (user) {
    // we found the user... keep going
    next(null, user)
  } else {
    // we didn't find the user... fail!
    next(null, false)
  }
}

const jwtStrategy = new JwtStrategy(jwtOptions, jwtVerifyToken);

function protectContentMiddleware(req, res, next) {
  if (req.path.startsWith('/login') || req.path.startsWith('/signup')) {
    // If the request path starts with /login or /signup,
    // skip this middleware and continue to the next one.
    next();
  } else {

    // console.log(req);
    // Otherwise, authenticate user request token
    // console.log(req);
    passport.authenticate("jwt", { session: false })(req, res, next);
  }
}

module.exports = { jwtStrategy, protectContentMiddleware };
