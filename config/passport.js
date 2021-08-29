var passport = require('passport')
var JwtStrategy = require('passport-jwt').Strategy,
  ExtractJwt = require('passport-jwt').ExtractJwt
var GoogleTokenStrategy = require('passport-google-token').Strategy;

var User = require('../models/user')
var settings = require('../config/settings') // Get settings file
var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt')
opts.secretOrKey = settings.jwtSecret

passport.serializeUser(function (user, done) {
  done(null, user)
})

passport.deserializeUser(function (user, done) {
  User.findById({ id: user.id }, function (err, user) {
    done(err, user)
  })
})

passport.use(
  new JwtStrategy(opts, function (jwt_payload, done) {
    User.findOne({ _id: jwt_payload._id }, function (err, user) {
      if (err) {
        return done(err, false)
      }
      if (user) {
        done(null, user)
      } else {
        done(null, false)
      }
    })
  })
)

if(process.env.GOOGLE_SECRET){
  passport.use(new GoogleTokenStrategy({
    clientID: process.env.GOOGLE_CLIENT,
    clientSecret: process.env.GOOGLE_SECRET
  },
  function (accessToken, refreshToken, profile, done) {
    User.upsertGoogleUser(accessToken, refreshToken, profile, function(err, user) {
        return done(err, user);
    });
  })
  );
}