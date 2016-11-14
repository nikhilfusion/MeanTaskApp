var userCtrl = require('./controllers/user');
    bodyParser = require('body-parser');

module.exports = function(app){
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());
  app.post('/user', userCtrl.create);
  app.get('/user', userCtrl.list);
  app.post('/verifie', userCtrl.verifie);
};