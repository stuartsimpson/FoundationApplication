const mongoose = require('mongoose');

const fndtnRoleResources = {
  '_id': mongoose.Schema.Types.ObjectId,
  'resourceId': mongoose.Schema.Types.ObjectId,
  'roleId': mongoose.Schema.Types.ObjectId,
  '_get': Boolean,
  '_put': Boolean,
  '_post': Boolean,
  '_delete': Boolean
}

module.exports = fndtnRoleResources;
