const mongoose = require('mongoose');

let dbURL = process.env.MONGOLAB_URI||'mongodb://localhost/todo'

mongoose.connect(dbURL);
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("db connected")
});

let userSchema = new mongoose.Schema({
  googleId: {type: String, unique: true},
  email: String,
  name: String
})

let User = mongoose.model('user',userSchema)

let googleSignIn = ({id, emails, displayName},cb)=>{
  User.findOne({googleId: id}).then(existingUser=>{
    if(existingUser){
      cb(null,existingUser)
    }else{
      new User({googleId: id, email: emails[0].value, name: displayName}).save()
        .then(user => cb(null,user))
    }
  })
}

let deserialize = (id,cb)=>{
  User.findById(id).then(user=>{
    cb(null,user);
  })
}

module.exports = {
  googleSignIn,
  deserialize
}