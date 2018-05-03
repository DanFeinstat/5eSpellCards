//regex to only allow numbers and letters
// /^[a-z0-9]+$/i;

const orm = require("../config/orm.js");

const model = {
  newUser: function(name, password, cb) {
    orm.addUser("users", name, password, function(res) {
      cb(res);
    });
  },
  testGetter: function(name, cb) {
    orm.testGet(name, function(res) {
      cb(res);
    });
  },
};

module.exports = model;
