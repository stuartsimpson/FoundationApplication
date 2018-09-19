const mongoose = require('mongoose');

const fndtnApplicationErrors = {
  '_id': mongoose.Schema.Types.ObjectId,
  'number': Number,
  'type': String,
  'message': String,
  'linkURL': String,
  'linkDisplay': String
}

module.exports = fndtnApplicationErrors;
