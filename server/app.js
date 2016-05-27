var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var multer = require('multer');
var Sequelize = require('sequelize');

var dbconn = new Sequelize('', '', '', {
    dialect: 'sqlite',
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    },
    // SQLite only
    storage: 'data/loginform.db',
    define: {
        timestamps: false // true by default
    },
    logging: false
});


//setting db connection
var db = require('./db')(dbconn);


var routes = require('./routes')(db.Users);
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use('/api',routes);



//setting routes
app.get('/', function (req, res) {
  //res.set('Content-Type', 'application/json');
  //res.json({ some: 'jsdon' });
  res.send("OK");
});



app.listen(3000, function () {
  console.log('Login Form Sample listening on port 3000!');
});