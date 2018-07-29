const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const {GOOGLE_CLIENTID,GOOGLE_CLIENTSECRET} = require('../config.js')
let user = require('../model/user')

passport.serializeUser((user,done)=>{
  done(null,user.id)
})

passport.deserializeUser((id,done)=>{
  user.deserialize(id,done)
})

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENTID || GOOGLE_CLIENTID,
  clientSecret: process.env.GOOGLE_CLIENTSECRET || GOOGLE_CLIENTSECRET,
  callbackURL: "/auth/google/callback",
  proxy: true
  },(accessToken,refreshToken,profile,done)=>{
  user.googleSignIn(profile,done)
}))