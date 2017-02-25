var data = require('./lib/userData.json');
var users = require('./users.js');

function readAll() {
    return users.find();
}

function findUserById(userId) {
  return users.findOne('id',userId)

}

function getAdmins(){
  return users.find("type",'admin')
}

function getNonAdmins() {
  return users.find("type",'user')
}

// this one is fucked
function getUsersByFavorite (favorite){
  return users.find("favorite",favorite)
}

function getUsersByAgeLimit(age){
  return users.find("age",age)
}

function findUserByQuery(q,val){
  if(q === 'last_name'){
    return users.find(q, val);
  } else if (q === 'email' ){
    return users.find(q, val)
  } else if (q === 'state'){
    return users.find(q, val)
  } else if (q === 'type'){
    return users.find(q, val)
  }
}

function updateUser(id,obj){
  return users.update("id",id,obj)
}

function removeUser(id){
  return users.remove("id",id)
}

function createUser(obj){
  return users.add({
    id:obj.id,
    first_name:obj.first_name,
    last_name:obj.last_name,
    email:obj.email,
    gender:obj.gender,
    language:obj.language,
    age:obj.age,
    city:obj.city,
    state:obj.state,
    type:obj.type,
    favorites:[obj.favorites]
  })
  return users.add({obj})
}

module.exports = {
    readAll: readAll,
    findUserById: findUserById,
    getAdmins: getAdmins,
    getNonAdmins: getNonAdmins,
    getUsersByFavorite: getUsersByFavorite,
    getUsersByAgeLimit: getUsersByAgeLimit,
    findUserByQuery: findUserByQuery,
    updateUser: updateUser,
    removeUser: removeUser
  }
