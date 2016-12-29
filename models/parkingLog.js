const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var parkingLogSchema = new Schema({
    userID: String,
    created_at: Date,
    geo: { type: { type: String }, coordinates: [Number] }
});

parkingLogSchema.index({geo: "2dsphere"});

// the schema is useless so far
// we need to create a model using it
var ParkingLog = mongoose.model('ParkingLog', parkingLogSchema);

module.exports = ParkingLog;