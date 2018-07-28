const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let userSchema = new Schema({
  username: {type: String, unique: true, sparse:true}, 
  googleId: {type: String, unique: true, sparse:true},
  email: String,
  name: String,
  sentFriendRequests: [{type: Schema.Types.ObjectId, ref: 'user'}],
  receivedFriendRequests: [{type: Schema.Types.ObjectId, ref: 'user'}],
  friends: [{type: Schema.Types.ObjectId, ref: 'user'}],
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

let getAllUser = (userId, cb)=>{
  User.findById(userId).then(user=>{
    let exclude = [userId,...user.friends,...user.sentFriendRequests,...user.receivedFriendRequests]
    User.find({_id: {$nin: exclude}}).then(users=>{
      cb(null,users)
    })
  })
}

let updateUsername = (id,username,cb)=>{
  User.findByIdAndUpdate(id,{
    $set: {username}
  },{new: true}).then(user=>cb(null,user))
}

let sendFriendRequest = (senderId,receiverId,cb)=>{
  User.findByIdAndUpdate(senderId,{
    $addToSet: {sentFriendRequests: receiverId}
  }).then(()=>{
    User.findByIdAndUpdate(receiverId,{
      $addToSet: {receivedFriendRequests: senderId}
    }).then((result)=>cb(null,result))
  })
}

let handleFriendRequest = (senderId,receiverId,accepted,cb)=>{
  console.log({senderId,receiverId})
  User.findByIdAndUpdate(senderId,{
    $pull: {sentFriendRequests: receiverId}
  }).then(()=>{
    User.findByIdAndUpdate(receiverId,{
      $pull: {receivedFriendRequests: senderId}
    }).then(()=>{

      if(!accepted){
        cb(null,"You've been rejected")
      }else{
        User.findByIdAndUpdate(senderId,{
          $addToSet: {friends: receiverId}
        }).then(()=>{
          User.findByIdAndUpdate(receiverId,{
            $addToSet: {friends: receiverId}
          }).then(result=> cb(null,result))
        })
      }
    })
  })
}

let getFriendRequests = (userId, cb)=>{
  User.findById(userId, 'receivedFriendRequests friends')
    .populate('receivedFriendRequests friends', 'username name')
    .then(results=>{
      cb(null,results)
    })
}

module.exports = {
  googleSignIn,
  deserialize,
  getAllUser,
  updateUsername,
  sendFriendRequest,
  handleFriendRequest,
  getFriendRequests,
}