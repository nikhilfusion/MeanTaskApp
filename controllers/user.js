var User = require('../models/employer'),
    nodemailer = require('nodemailer'),
    btoa = require('btoa'),
    atob = require('atob'),
    moment = require('moment'),
    transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: 'codebrahmatest@gmail.com', // Your email id
        pass: 'codebrahma123@' // Your password
      }
});

module.exports.create = function(req, res) {
  User.find({email : req.body.email}, function(err, userExist) {
    if(err) { res.send(err) }
    else {
      console.log("userExist", userExist);
      if(userExist.length > 0) {
        res.status(400);
        res.send("user already exist");
      } else {
        var user = new User(req.body);
        user.save(function(err, result) {
          if(err) {
            res.send(err);
          } else {
            var textLink = "http://127.0.0.1:3000/#/verifie?userId=" + btoa(result._id);
            var mailOptions = {
              from: 'codebrahmatest@gmail.com',
              to: req.body.email,
              subject: 'Signup Confirmation ✔',
              html: '<b>Signup Confirmation ✔</b><br />'
              + 'Your email account is : ' + result.email + '<br />'
              + '<a href=\"'+ textLink.toString() + '\">Click here to activate your account.</a>'
              + '<br />'
            };  
            transporter.sendMail(mailOptions, function(error, info){
              if(error){
                console.log(error);
              }else{
                res.send(user)
                console.log('Message sent: ' + info.response);
              };
            });
          }
        });  
      }
    }  
  })
}

module.exports.list = function(req, res) {
  User.find({ del_flg: false }, function(err, result) {
    if(err) {
      res.send(err);
    } else {
      res.send(result);
    }
  })
}; 

module.exports.verifie = function(req, res) {
  var userId = decodeInfo(req.body.userId);
  User.find({_id : userId, del_flg: false}, function(err, userExist) {
    if(err) {
      res.send(err);
    } else {
      if(userExist.length > 0 && !userExist[0].is_verified){
        User.update({_id : userId}, {$set : {"is_verified" : true}}, function(err, result) {
          console.log("asdadd");
          res.send("success");
        })
      } else {
        if(userExist[0].is_verified) {
          res.status(403);
          res.send("already verified");
        } else {
          res.status(404);
          res.send("user doesn't exist");
        }
      }
    }
  })
};

function decodeInfo(info) {
  return atob(info);
};