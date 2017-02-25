var express = require('express');
var bodyParser = require('body-parser');
var port = 3001;

// controllers
var userCtrl = require('./userCtrl.js');

var app = express();
app.use(bodyParser.json());


app.get('/api/users',function(req,res,next){
  if(!!req.query.favorites){
    userCtrl.getUsersByFavorite(req.query.favorites)
      .then(response => {
        res.status(200).send(response)
      })
      .catch(err => {
        res.status(404).send(err)
      })
  } else if (!!req.query.age) {
    userCtrl.getUsersByAgeLimit(req.query.age)
      .then(response => {
        res.status(200).send(response);
      })
      .catch(err => {
        res.status(404).send(err);
      })
  }
  else {
    userCtrl.readAll()
      .then(response => {
        console.log(response)
        res.status(200).send(response)
      })
      .catch(err => {
        res.status(422).send(err)
      })
  }

})

app.get('/api/users/:userId',function(req,res,next){
  console.log(req.params.userId)
  userCtrl.findUserById(req.params.userId)
    .then(response => {
      res.status(200).send(response)
    })
    .catch(err => {
      res.status(404).send(err)
    })
})

app.get('/api/admins', function(req,res,next){
  userCtrl.getAdmins()
    .then(response => {
      res.status(200).send(response)
    })
    .catch(err => {
      res.status(404).send(err)
    })
})

app.get('/api/nonadmins', function(req,res,next){
  userCtrl.getNonAdmins()
    .then(response => {
      res.status(200).send(response);
    })
    .catch(err => {
      res.status(404).send(err);
    })
})

app.put('/api/users/:userId', function(req,res,next){
  users.updateUser(req.params.id,req.body)
    .then(response => {
      res.status(200).send(response);
    })
    .catch(err => {
      res.status(422).send(err);
    })
})

app.delete('/api/users/:userId', function(req,res,next){
  userCtrl.removeUser(req.params.id)
    .then(response => {
      res.status(200).send(response);
    })
    .catch(err => {
      res.status(422).send(err)
    })
})

app.post('/api/users', function(req,res,next){
    userCtrl.createUser(req.params.user)
    .then(response => {
      res.status(200).send(response)
    })
    .catch(err => {
      res.status(422).send(err)
    })
})

app.listen(port,function(){
  console.log('listening on port', port)
})


module.exports = {
  app : app
}
