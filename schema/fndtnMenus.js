const mongoose = require('mongoose');

const fndtnMenus = {
  '_id': mongoose.Schema.Types.ObjectId,
  'menuType': String,
  'display': String,
  'resourceURL': String
}

module.exports = fndtnMenus;
