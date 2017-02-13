'use strict';

const
  mongoose = require("mongoose"),
  Schema = mongoose.Schema;

const clientSchema = new Schema({
  clientId: Schema.Types.ObjectId,
  deviceId: String, // IMEI of client’s mobile device
  phoneNumber: {type: String, required: true},
  token: String // active JWT auth token assigned to client
}, {collection: 'clients', versionKey: false, shardKey: { _id: true } });

module.exports = mongoose.model("Client", clientSchema);
