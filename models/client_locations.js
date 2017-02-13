'use strict';

const
  mongoose = require("mongoose"),
  Schema = mongoose.Schema,
  require('mongoose-long')(mongoose);

const clientLocationSchema = new Schema({
  clientID: Schema.Types.ObjectId,
  latitude: Schema.Types.Long,
  longtitude: Schema.Types.Long,
  timeStamp: {type: Date, default: Date.now}
}, {collection: 'client_locations', versionKey: false, shardKey: { _id: true } });

module.exports = mongoose.model("ClientLocation", clientLocationSchema);
