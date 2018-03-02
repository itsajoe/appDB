// require models
var db = require('../models');
// export function
module.exports = function(app) {
    app.post('/new/coupon/:id', function(req, res) {
        var coupon = {
            image: req.body.image
        }
        db.Coupon
      .create(coupon)
      .then(function(data) {
        return db.ListItem.findOneAndUpdate({_id: req.params.id}, {coupon: data._id}, {new: true});
      })
      .then(function(response) {
        res.json(response);
      })
      .catch(function(err) {
        res.json(err);
      });
    });
};