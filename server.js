// require packages
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
// require models
var db = require('./models');
// instantiate app
var PORT = process.env.PORT || 9000;
var app = express();
// configure middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/vnd.api+json'}));
// connect to db
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/appDB";
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);
// require routes
require('./routes/user-api-routes.js') (app);
require('./routes/list-api-routes.js') (app);
require('./routes/listItems-api-routes.js') (app);
// listen
app.listen(PORT, function() {
    console.log("App is listening on port: " + PORT);
});
