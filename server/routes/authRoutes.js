let passport = require('passport');
let authRouter = require('express').Router();

authRouter.get('/google',
  passport.authenticate('google',{ 
    scope: ['profile','email'],
    prompt: 'select_account'}),
  (req,res)=> res.send(""))

authRouter.get('/google/callback',
  passport.authenticate('google'),
  (req,res)=> res.redirect("http://localhost:8080"))

authRouter.get('/logout', (req,res)=>{
  req.logout()
  res.redirect('http://localhost:8080/')
})

authRouter.get('/current_user', (req, res)=>{
  res.send(req.user)
})

module.exports = authRouter