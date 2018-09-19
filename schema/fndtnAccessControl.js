const mongoose = require('mongoose');

const fndtnAccessControl = {
  '_id': mongoose.Schema.Types.ObjectId,
  'resourceId': mongoose.Schema.Types.ObjectId,
  'userId': mongoose.Schema.Types.ObjectId,
  '_get': Boolean,
  '_post': Boolean,
  '_put': Boolean,
  '_delete': Boolean
}

module.exports = fndtnAccessControl;
