'use strict';

const
  mongoose = require("mongoose"),
  Schema = mongoose.Schema;

const userSchema = new Schema({
  userId: Schema.Types.ObjectId,
  userType: { type: String, required: true },
  deviceId: String, // IMEI of client’s mobile device
  phoneNumber: {type: String, required: true},
  token: String, // active JWT auth token assigned to client
  active: Boolean // TRUE if we still work with this driver
}, {collection: 'users', versionKey: false, shardKey: { _id: true } });

module.exports = mongoose.model("User", userSchema);
