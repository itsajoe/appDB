// require packages and models
var bcrypt = require('bcrypt');
var db = require('../models');
// export route function
module.exports = function(app) {
    app.post("/user/new", function(req, res) {
        bcrypt.genSalt(10, function(err, salt) {
            bcrypt.hash(req.body.password, salt, function(err, hash) {
                // Store hash in your password DB.
                if(err){
                    console.log("wer got and err", err)
                }
                else{
                    console.log("this is a hash", hash)
                    db.User.create({
                        email: req.body.email,
                        username: req.body.username,
                        password: hash
                    }).then(function(dbUser) {
                        res.json(dbUser);
                        console.log("User inserted");
                    });
                }
            });
        });
    });
    
    app.post("/login", function(req, res){
        db.User.findOne({
                username: req.body.username
        }).then(function(dbData){
            // Load hash from your password DB.
            // console.log(dbData);
            bcrypt.compare(req.body.password, dbData.password, function(err, response) {
                // res == true
                // console.log(response);
                if(response){
                    var user = {
                        id: dbData._id,
                        email: dbData.email,
                        username: dbData.username,
                        isLogged: dbData.isLogged
                    }
                    console.log(user);
                    db.User.findOneAndUpdate({_id: dbData._id}, {isLogged: true}
                ).then(function(data) {
                    console.log("logged In");
                    res.json(data);
                }); 
                }
                else{
                    res.status(404).json("Check your username and password.")
                }
            });
        })
    })
}