let passport = require('passport');
let authRouter = require('express').Router();

authRouter.get('/google',
  passport.authenticate('google',{ scope: ['profile','email'] }),
  (req,res)=> res.send(""))

authRouter.get('/google/callback',
  passport.authenticate('google'),
  (req,res)=> res.redirect("/"))

authRouter.get('/logout', (req,res)=>{
  req.logout()
  res.redirect('/')
})

authRouter.get('/current_user', (req, res)=>{
  res.send(req.user)
})

module.exports = authRouter