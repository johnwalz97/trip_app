var mongoose = require("mongoose");
var UserSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    email: String,
    password: String,
    token: String,
    created_at: {type: Date, default: new Date()}
})
var User = mongoose.model('User', UserSchema);