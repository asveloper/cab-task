'use strict';

const
  mongoose = require("mongoose"),
  Schema = mongoose.Schema;

const clientSchema = new Schema({
  clientId: Schema.Types.ObjectId,
  deviceId: String,
  phoneNumber: {type: String, required: true},
  token: String
}, {collection: 'clients', versionKey: false, shardKey: { _id: true } });

module.exports = mongoose.model("Client", clientSchema);
