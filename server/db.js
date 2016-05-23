var Sequelize = require('sequelize');

module.exports = function (sequelize) {


    var Users = sequelize.define('users', {
        id: {
            type: Sequelize.INTEGER,
            field: 'id',
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: Sequelize.STRING,
            unique: true
        },
        password: {
            type: Sequelize.STRING
        },
        lastname: {
            type: Sequelize.STRING
        },
        firstname: {
            type: Sequelize.STRING
        },
        middlename: {
            type: Sequelize.STRING
        },
        gender: {
            type: Sequelize.STRING
        },
        location: {
            type: Sequelize.STRING
        },
    }, {
        freezeTableName: true // Model tableName will be the same as the model name
    });


    /*Users.sync({force: false}).then(function () {
        // Table created
        return Users.create({
            username: 'username',
            password: 'password',
            ...
        });
    }).catch(function(error) {
      console.log('999 user already created');
    });
    */
    

     return {
        Users : Users
    };


}