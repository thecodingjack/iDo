const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const {GOOGLE_CLIENTID,GOOGLE_CLIENTSECRET} = require('../config.js')
let user = require('../model/model.js')

passport.serializeUser((user,done)=>{
  done(null,user.id)
})

passport.deserializeUser((id,done)=>{
  user.deserialize(id,done)
})

passport.use(new GoogleStrategy({
  clientID: GOOGLE_CLIENTID,
  clientSecret: GOOGLE_CLIENTSECRET,
  callbackURL: "http://localhost:3000/auth/google/callback"
  },(accessToken,refreshToken,profile,done)=>{
  user.googleSignIn(profile,done)
}))