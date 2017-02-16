'use strict';

const
  mongoose = require("mongoose"),
  Schema = mongoose.Schema;

const userLocationSchema = new Schema({
  userId: Schema.Types.ObjectId,
  location: {
    type: { type: String },
    coordinates: [Number] // longitude, latitude
  },
  timeStamp: {type: Date, default: Date.now}
}, {collection: 'user_locations', versionKey: false, shardKey: { _id: true } });

userLocationSchema.index({ "location": "2dsphere" });

module.exports = mongoose.model("UserLocation", userLocationSchema);
