'use strict';

const
  mongoose = require("mongoose"),
  Schema = mongoose.Schema;

const clientSchema = new Schema({
  clientID: Schema.Types.ObjectId,
  deviceID: String,
  phoneNumber: {type: String, required: true},
  token: String
}, {collection: 'clients', versionKey: false, shardKey: { _id: true } });

module.exports = mongoose.model("Client", clientSchema);
