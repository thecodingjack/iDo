let passport = require('passport');
let authRouter = require('express').Router();
let clientUrl = process.env.CLIENT_URL || "http://localhost:8080"

authRouter.get('/google',
  passport.authenticate('google',{ 
    scope: ['profile','email'],
    prompt: 'select_account'}),
  (req,res)=> res.send(""))

authRouter.get('/google/callback',
  passport.authenticate('google'),
  (req,res)=> {
    console.log("redirecting")
    res.redirect(clientUrl)}
  )

authRouter.get('/logout', (req,res)=>{
  req.logout()
  res.redirect(clientUrl)
})

authRouter.get('/current_user', (req, res)=>{
  res.send(req.user)
})

module.exports = authRouter