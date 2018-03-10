// require models
var db = require('../models');
// export function
module.exports = function(app) {
    app.post('/new/listItem/:id', function(req, res) {
        var listItem = {
            name: req.body.name
        }
        db.ListItem
      .create(listItem)
      .then(function(data) {
        return db.List.findOneAndUpdate({_id: req.params.id}, {$addToSet: {listItems: data._id}}, {new: true});
      })
      .then(function(response) {
        res.json(response);
      })
      .catch(function(err) {
        res.json(err);
      });
    });
    app.put('/updateItem/:id', function(req, res) {
      var updated = {
        name: req.body.name,
        isBought: req.body.isBought
      };
      db.ListItem.findOneAndUpdate({_id: req.params.id}, {name: req.body.name, isBought: req.body.isBought}, {new: true})
      .then(function(data) {
        res.json(data);
      })
      .catch(function(err){
        res.send(err);
      })
    });
    app.get('/listItem/:id', function(req, res) {
      db.ListItem.findOne({_id: req.params.id})
      .populate("coupon")
      .then(function(data) {
          res.json(data);
      })
  });
  app.delete('/delete/listItem/:id', function(req, res) {
    db.ListItem.deleteOne({_id: req.params.id})
    .then(function(data) {
        res.json(data);
    })
});
app.delete('/deleteMany/:id', function(req, res) {
  db.List.find({_id: req.params.id})
  .deleteMany({isBought: true})
  .then(function(data) {
      res.json(data);
  })
});
}
