// require mongoose
var mongoose = require('mongoose');
// save constructor
var Schema = mongoose.Schema;
// make new schema
var ListItemSchema = new Schema({
    name: {
        type: String,
        required: 'Item Name Required'
    },
    icon: {
        type: String
    },
    coupon: {
        type: Schema.Types.ObjectId,
        ref: "Coupon"
    },
    isBought: {
        type: Boolean,
        default: false
    }
});
// make collection
var ListItem = mongoose.model("ListItem", ListItemSchema);
// export model
module.exports = ListItem;