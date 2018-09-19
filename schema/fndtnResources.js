const mongoose = require('mongoose');

const fndtnResources = {
  _id: mongoose.Schema.Types.ObjectId,
  name: String,
  file: String,
  url: String,
  static: Boolean,
  public: Boolean,
  protected: Boolean
}

module.exports = fndtnResources;
