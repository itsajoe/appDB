// require mongoose
var mongoose = require('mongoose');
// save constructor
var Schema = mongoose.Schema;
// make a new schema
var UserSchema = new Schema ({
    username: {
        type: String,
        required: "Username is Required"
    },
    password: {
        type: String,
        trim: true,
        required: "Password is Required",
        validate: [
          function(input) {
            return input.length >= 6;
          },
          "Password should be longer."
        ]
      },
      email: {
        type: String,
        unique: true,
        match: [/.+\@.+\..+/, "Please enter a valid e-mail address"]
      },
      lists: [{
        type: Schema.Types.ObjectId,
         ref: "List"
    }],
      userCreated: {
        type: Date,
        default: Date.now
      },
      isLogged: {
          type: Boolean,
          default: false
      }
});
// make collection
var User = mongoose.model("User", UserSchema);
// export model
module.exports = User;

