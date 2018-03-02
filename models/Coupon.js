// require mongoose
var mongoose = require('mongoose');
// save constructor
var Schema = mongoose.Schema;
// make new schema
var CouponSchema = new Schema ({
    image: {
        type: String,
        required: "An image is required"
    }
});
// make collection
var Coupon = mongoose.model("Coupon", CouponSchema);
// export schema
module.exports = Coupon;