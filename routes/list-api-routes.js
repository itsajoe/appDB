// require models
var db = require('../models');
// export function
module.exports = function(app) {
    app.post('/new/list', function(req, res) {
        var list = {
            store: req.body.store,
        }
    db.List.create(list)
        .then(function(data){
            res.json(data);
        })
    });
    app.get('/list/:id', function(req, res) {
        db.List.findOne({_id: req.params.id})
        .populate("listItems")
        .then(function(data) {
            res.json(data);
        })
    });
    app.get('/list', function(req, res) {
        db.List.find()
        .then(function(data) {
            res.json(data);
        })
    });
    app.delete('/delete/list/:id', function(req, res) {
        db.List.deleteOne({_id: req.params.id})
        .then(function(data) {
            res.json(data);
        })
    });

}
