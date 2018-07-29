const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy
let user = require('../model/user')
const GOOGLE_CLIENTID = process.env.GOOGLE_CLIENTID || require('../config.js').GOOGLE_CLIENTID
const GOOGLE_CLIENTSECRET = process.env.GOOGLE_CLIENTSECRET || require('../config.js').GOOGLE_CLIENTSECRET

passport.serializeUser((user,done)=>{
  done(null,user.id)
})

passport.deserializeUser((id,done)=>{
  user.deserialize(id,done)
})

passport.use(new GoogleStrategy({
  clientID: GOOGLE_CLIENTID,
  clientSecret: GOOGLE_CLIENTSECRET,
  callbackURL: "/auth/google/callback",
  proxy: true
  },(accessToken,refreshToken,profile,done)=>{
  user.googleSignIn(profile,done)
}))