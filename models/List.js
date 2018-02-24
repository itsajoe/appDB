// require mongoose
var mongoose = require('mongoose');
// save constructor
var Schema = mongoose.Schema;
// make new schema
var ListSchema = new Schema ({
    store: {
        type: String,
        required: "A store location is required"
    },
    logo: {
        type: String
    },
    listItems: [{
            type: Schema.Types.ObjectId,
             ref: "ListItem"
        }],
    finished: {
        type: Boolean,
        default: false
    }
});
// make collection
var List = mongoose.model("List", ListSchema);
// export schema
module.exports = List;