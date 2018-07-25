let express = require('express')
let session = require('express-session')
let morgan = require('morgan');
let parser = require('body-parser');
let cors = require('cors');
let passport = require('passport')
require('./services/passport.js');

var authRouter = require('./routes/authRoutes.js')

let app = express()
let port = process.env.PORT || 3000;
app.set('port',port);

/****** express middleware ******/
app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan('dev'));
app.use(session({ secret: 'todo-secret', cookie: { maxAge: 600000 }}))
app.use(passport.initialize());
app.use(passport.session())
/******* end of middleware ******/

app.use('/auth',authRouter)
app.use(express.static(__dirname + '/../client/dist'));

app.get('/*',(req,res)=>{
  res.redirect('/')
})

app.listen(port,()=> console.log('Listening on : ' + port))

module.exports.app = app;