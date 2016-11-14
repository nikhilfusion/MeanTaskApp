var express = require('express'),
    app = express(),
    mongoose = require('mongoose'),
    routes = require('./routes')(app);
mongoose.connect('mongodb://localhost:27017/contacts');
app.use(express.static(__dirname + "/public"));
app.use(function(req, res, next){
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
});
app.listen(3000, function() {
  console.log("app is running on port 3000");
});