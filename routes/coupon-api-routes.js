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
    app.get('/all/coupons/:id', function(req, res) {
      db.List.findOne({_id: req.params.id})
        .populate("listItems")
        .then(function(data) {
            var listCoups = [];
            // console.log(data);
            for (let i = 0; i < data.listItems.length; i++) {
                listCoups.push(data.listItems[i].coupon);
              }
              // console.log(listCoups);
              db.Coupon.find({_id: listCoups})
              .then(function(data) {
                res.send(data);
              }).catch(function(err) {
                res.send(err);
              })
            })
    });
};