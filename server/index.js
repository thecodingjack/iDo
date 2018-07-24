let express = require('express')
let session = require('express-session')
let morgan = require('morgan');
let parser = require('body-parser');
let cors = require('cors');
const readline = require('readline');
const {google} = require('googleapis');
const {GOOGLE_CLIENTID,GOOGLE_CLIENTSECRET,GOOGLE_redirect_uris} = require('./config')
const SCOPES = ['https://www.googleapis.com/auth/gmail.readonly'];

let app = express()

let port = process.env.PORT || 3000;

app.set('port',port);
app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan('dev'));
app.use(session({
  secret: 'super-secret-12345',
  resave: true,
  saveUninitialized: true
}));

app.use(express.static(__dirname + '/../client/dist'));

const oAuth2Client = new google.auth.OAuth2(GOOGLE_CLIENTID,GOOGLE_CLIENTSECRET, 'http://localhost:3000/auth/google/callback');
app.get('/auth/google',(req,res)=>{
  if(!req.session.token) return getNewToken(oAuth2Client,res)
  oAuth2Client.setCredentials(req.session.token)
  res.send(req.session.token)
})

app.use('/auth/google/callback',(req,res)=>{
  oAuth2Client.getToken(req.query.code, (err, mToken) => {
    if (err) return res.send(err);
    oAuth2Client.setCredentials(mToken);
    req.session.token = mToken;
    res.redirect('/');
  });
})

function getNewToken(oAuth2Client,res){
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });
  res.redirect(authUrl);
}

app.get('/*',(req,res)=>{
  res.redirect('/')
})

app.listen(port,()=> console.log('Listening on : ' + port))

module.exports.app = app;

// let express = require('express')
// let session = require('express-session')
// let morgan = require('morgan');
// let parser = require('body-parser');
// let cors = require('cors');
// const passport = require('passport')
// const GoogleStrategy = require('passport-google-oauth20').Strategy;
// const {GOOGLE_CLIENTID,GOOGLE_CLIENTSECRET} = require('./config.js')
// let app = express()
// let port = process.env.PORT || 3000;

// passport.use(new GoogleStrategy({
//   clientID: GOOGLE_CLIENTID,
//   clientSecret: GOOGLE_CLIENTSECRET,
//   callbackURL: "http://localhost:3000/auth/google/callback"
//   },(accessToken,refreshToken,profile,done)=>{
//   console.log(accessToken)
// }))


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

// app.get(
//   '/auth/google',
//   passport.authenticate('google',{ scope: ['https://www.googleapis.com/auth/plus.login'] }),
//   (req,res)=> res.send(""))

// app.get(
//   '/auth/google/callback',
//   passport.authenticate('google'),
//   (req,res)=> res.send(""))

// app.get('/*',(req,res)=>{
//   res.redirect('/')
// })

// app.listen(port,()=> console.log('Listening on : ' + port))

// module.exports.app = app;