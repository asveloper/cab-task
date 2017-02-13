'use strict';

const
  mongoose = require("mongoose"),
  Schema = mongoose.Schema;

const driverSchema = new Schema({
  driverId: Schema.Types.ObjectId,
  deviceId: String,
  phoneNumber: String,
  token: String,
  driverStatus: String,
  status: Boolean
}, {collection: 'drivers', versionKey: false, shardKey: { _id: true } });

module.exports = mongoose.model("Driver", driverSchema);
