'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var StoreSchema = new Schema({
  name: String,
  info: String,
  active: Boolean,
  mainImage: String,
  images: [{
        name: String,
        path: String

    }]
});

module.exports = mongoose.model('Store', StoreSchema);
