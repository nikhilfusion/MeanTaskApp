var chai = require('chai'),
    chaiHttp = require('chai-http'),
    server = require('../server'),
    should = chai.should(),
    mongoose = require('mongoose'),
    config = require('./config');
chai.use(chaiHttp);
mongoose.connect('mongodb://localhost:27017/contacts', function(err, res) {
  if(err) {
    console.log('Error connecting to the database. ' + err);
  } else {
    console.log('Connected to Database: ' + config.mongoURI[app.settings.env]);
  }
});

describe('employer', function() {
  it('should list ALL employers on /user GET', function(done) {
  chai.request(server)
    .get('/user')
    .end(function(err, res){
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.be.a('array');
      done();
    });
  });  
});

it('should add a SINGLE user on /user POST', function(done) {
  chai.request(server)
    .post('/user')
    .send({
      'name': 'Nikhil', 
      'email': 'nikhil123@mailinator.com', 
      'dob': '24/02/1989',
      'gender': 'M',
      'is_verified': false,
      'del_flg': false  
    })
    .end(function(err, res){
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.be.a('object');
      res.body.should.have.property('SUCCESS');
      res.body.SUCCESS.should.be.a('object');
      res.body.SUCCESS.should.have.property('name');
      res.body.SUCCESS.should.have.property('email');
      res.body.SUCCESS.should.have.property('dob');
      res.body.SUCCESS.should.have.property('gender');
      res.body.SUCCESS.should.have.property('is_verified');
      res.body.SUCCESS.should.have.property('del_flg');
      res.body.SUCCESS.should.have.property('_id');
      res.body.SUCCESS.name.should.equal('Nikhil');
      res.body.SUCCESS.email.should.equal('nikhil123@mailinator.com');
      res.body.SUCCESS.dob.should.equal('24/02/1989');
      res.body.SUCCESS.gender.should.equal('M');
      res.body.SUCCESS.is_verified.should.equal(false);
      res.body.SUCCESS.del_flg.should.equal(false);
      done();
    });
});