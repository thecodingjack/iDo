let passport = require('passport');
let authRouter = require('express').Router();
let clientUrl = process.env.CLIENT_URL || "http://localhost:8080"
let user = require('../model/user')

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

authRouter.get('/login',
  passport.authenticate('local',{
    successRedirect: '/',
    failureRedirect: '/'
  })
)

authRouter.post('/signup', (req, res)=>{
  let {username,password} = req.body;
  user.localSignUp({username,password},(err,user)=>{
    if(err) res.send(err)
    res.send(user)
  })
})

module.exports = authRouter