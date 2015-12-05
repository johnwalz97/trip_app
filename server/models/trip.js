var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var TripSchema = new mongoose.Schema({
    start: String,
    destination: String,
    beginDate: Date,
    endDate: Date,
    created_at: {type: Date, default: new Date()},
    updated_at: {type: Date, default: new Date()},
    _user: {type: Schema.Types.ObjectId, ref: 'User'}
})
var Trip = mongoose.model('Trip', TripSchema);