var express = require('express');
var router = express.Router();




module.exports =  function (Users){
    
       router.get('/ping', function(req, res,next) {
        res.send("Pong");
        });
 
     // Get all the users
        router.get('/users', function(req, res,next) {

                Users.findAll().then(function(users){
                    res.json(users);
                }).catch(function(error){
                    res.status(404);
                });

        });


    // Post/Add a new user
        router.post('/users', function(req, res,next) {
           
               Users.create(req.body).then(function(user) {
                            res.status(201).json(user);
                        }).catch(function(error){
                            res.sendStatus(500);
                        });
       
        });

     // Get a user
        router.get('/users/:id', function(req, res,next) {

                Users.findById(req.params.id).then(function(user){
                            if(user==null)
                            {
                                res.sendStatus(404);
                                next();
                            }
                            res.json(user);
                        }).catch(function(error){
                            res.sendStatus(404);
                        });
                       
        });
        
        
        // Update a user
        router.patch('/users/:id', function(req, res,next) {
        
        
                  Users.findById(req.params.id).then(function(user){
                    if(user==null)
                    {
                        res.sendStatus(404);
                        next();
                    }

                        user.updateAttributes(req.body).then(function(user) {
                            res.status(200).json(user);
                        });



                        }).catch(function(error){
                            res.sendStatus(404);
                        });


        });
        
        
        // Delete a user
        
        router.delete('/users/:id', function(req, res,next) {

            Users.findById(req.params.id).then(function(user){
                    if(user==null)
                        {
                            res.sendStatus(404);
                            next();
                        }

                        user.destroy().then(function(user) {
                            res.status(200).json(user);
                        });



                    }).catch(function(error){
                        res.sendStatus(404);
                    });
       });
        
        

        return router;
}







 