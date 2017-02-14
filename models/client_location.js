'use strict';

const
  mongoose = require("mongoose"),
  Schema = mongoose.Schema;

const clientLocationSchema = new Schema({
  clientId: Schema.Types.ObjectId,
  location: {
    type: { type: String },
    coordinates: [Number] // longitude, latitude
  },
  timeStamp: {type: Date, default: Date.now}
}, {collection: 'client_locations', versionKey: false, shardKey: { _id: true } });

clientLocationSchema.index({ "location": "2dsphere" });

module.exports = mongoose.model("ClientLocation", clientLocationSchema);
