'use strict';

const
  mongoose = require("mongoose"),
  Schema = mongoose.Schema;

const driverSchema = new Schema({
  driverId: Schema.Types.ObjectId,
  deviceId: String, // IMEI of driver’s mobile device
  phoneNumber: String,
  token: String, // active JWT auth token assigned to driver
  driverStatus: String, // IDLE, ENROUTE, ONTHEWAY, NOTAVAILABLE
  active: Boolean // TRUE if we still work with this driver
}, {collection: 'drivers', versionKey: false, shardKey: { _id: true } });

module.exports = mongoose.model("Driver", driverSchema);
