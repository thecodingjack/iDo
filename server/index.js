// let express = require('express')
// let session = require('express-session')
// let morgan = require('morgan');
// let parser = require('body-parser');
// let cors = require('cors');
// const readline = require('readline');
// const {google} = require('googleapis');
// const {GOOGLE_CLIENTID,GOOGLE_CLIENTSECRET,GOOGLE_redirect_uris} = require('./config')
// const SCOPES = ['https://www.googleapis.com/auth/plus.login'];

// let app = express()

// let port = process.env.PORT || 3000;

// app.set('port',port);
// app.use(parser.json());
// app.use(parser.urlencoded({ extended: true }));
// app.use(cors());
// app.use(morgan('dev'));
// app.use(session({
//   secret: 'super-secret-12345',
//   resave: true,
//   saveUninitialized: true
// }));

// app.use(express.static(__dirname + '/../client/dist'));

// const oAuth2Client = new google.auth.OAuth2(GOOGLE_CLIENTID,GOOGLE_CLIENTSECRET, 'http://localhost:3000/auth/google/callback');
// app.get('/auth/google',(req,res)=>{
//   console.log(req.session.token)
//   if(!req.session.token) return getNewToken(oAuth2Client,res)
//   oAuth2Client.setCredentials(req.session.token)
//   res.send(req.session.token)
// })

// app.get('/api/logout',(req,res)=>{
//   delete req.session.token;
//   res.redirect('/')
// })

// app.use('/auth/google/callback',(req,res)=>{
//   oAuth2Client.getToken(req.query.code, (err, mToken) => {
//     if (err) return res.send(err);
//     oAuth2Client.setCredentials(mToken);
//     req.session.token = mToken;
//     res.redirect('/');
//   });
// })

// function getNewToken(oAuth2Client,res){
//   const authUrl = oAuth2Client.generateAuthUrl({
//     access_type: 'offline',
//     scope: SCOPES,
//   });
//   console.log(authUrl)
//   res.redirect(authUrl);
// }

// app.get('/*',(req,res)=>{
//   res.redirect('/')
// })

// app.listen(port,()=> console.log('Listening on : ' + port))

// module.exports.app = app;

let express = require('express')
let session = require('express-session')
let morgan = require('morgan');
let parser = require('body-parser');
let cors = require('cors');
const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const {GOOGLE_CLIENTID,GOOGLE_CLIENTSECRET} = require('./config.js')
let user = require('./model/model.js')
let app = express()
let port = process.env.PORT || 3000;

passport.serializeUser((user,done)=>{
  console.log({user})
  done(null,user.id)
})

passport.deserializeUser((id,done)=>{
  console.log({id})
  user.deserialize(id,done)
})

passport.use(new GoogleStrategy({
  clientID: GOOGLE_CLIENTID,
  clientSecret: GOOGLE_CLIENTSECRET,
  callbackURL: "http://localhost:3000/auth/google/callback"
  },(accessToken,refreshToken,profile,done)=>{
  user.googleSignIn(profile,done)
}))


app.set('port',port);
app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan('dev'));
app.use(session({ secret: 'todo-secret', cookie: { maxAge: 600000 }}))
app.use(passport.initialize());
app.use(passport.session())

app.use(express.static(__dirname + '/../client/dist'));

app.get(
  '/auth/google',
  passport.authenticate('google',{ scope: ['profile','email'] }),
  (req,res)=> res.send(""))

app.get(
  '/auth/google/callback',
  passport.authenticate('google'),
  (req,res)=> {
    res.redirect("/")
  })

app.get('/api/logout', (req,res)=>{
  req.logout();
  res.redirect('/')
})

app.get('/api/current_user', (req, res)=>{
  res.send(req.user)
})

app.get('/*',(req,res)=>{
  res.redirect('/')
})

app.listen(port,()=> console.log('Listening on : ' + port))

module.exports.app = app;