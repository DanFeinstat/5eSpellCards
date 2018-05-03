const connection = require("./connections.js");

var orm = {
  //add a new user
  addUser: function(tableName, user_name, user_password, cb) {
    let queryString = "INSERT INTO ?? (user_name, user_password) VALUES (?, ?)";
    connection.query(
      queryString,
      [tableName, user_name, user_password],
      function(err, res) {
        if (err) throw err;
        cb(res);
      }
    );
  },
  testGet: function(tableName, cb) {
    let queryString = "SELECT * FROM ??";
    connection.query(queryString, [tableName], function(err, res) {
      if (err) throw err;
      cb(res);
    });
  },

  insertOne: function(tableName, burgerName, cb) {
    let queryString = "INSERT INTO ?? (burger_name) VALUES (?)";
    connection.query(queryString, [tableName, burgerName], function(err, res) {
      if (err) throw err;
      cb(res);
    });
  },

  //create a user specific table for spell list
  createBook: function(tableName, cb) {
    let queryString = "CREATE TABLE ?? ";
    queryString += "(id INT(40) NOT NULL AUTO_INCREMENT,";
    queryString += " name VARCHAR(80) NOT NULL,";
    queryString += " range VARCHAR(12) NOT NULL,";
    queryString += " duration VARCHAR(20) NOT NULL,";
    queryString += " materials VARCHAR(150) NOT NULL,";
    queryString += " ritual VARCHAR(3) DEFAULT 'no',";
    queryString += " components VARCHAR(8),";
    queryString += " desc VARCHAR(2000) NOT NULL,";
    queryString += " higher_level VARCHAR(400),";
    queryString += " school VARCHAR(20) NOT NULL,";
    queryString += " castingTime VARCHAR(30) NOT NULL,";
    queryString += " PRIMARY KEY (id))";
    conneciton.query(queryString, [tableName], function(err, res) {
      if (err) throw err;
      cb(res);
    });
  },
  //add data to user specific table
  addSpell: function(
    tableName,
    name,
    range,
    duration,
    materials,
    ritual,
    components,
    desc,
    higher_level,
    castingTime,
    user_id,
    cb
  ) {
    let queryString =
      "INSERT INTO ?? (name, range, duration materials, ritual, components, desc, higher_level, school, castingTime)";
    queryString += "VALUES (?,?,?,?,?,?,?,?,?,?)";
    connection.query(
      queryString,
      [
        tableName,
        name,
        range,
        duration,
        materials,
        ritual,
        components,
        desc,
        higher_level,
        castingTime,
        user_id,
      ],
      function(err, res) {
        if (err) throw err;
        cb(res);
      }
    );
  },
};

// export
module.exports = orm;
