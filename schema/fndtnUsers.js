const mongoose = require('mongoose');
const Job = require('./Job.js');
const Name = require('./Name.js');
const Account = require('./Account.js');
const Emails = require('./Emails.js');
const Addresses = require('./Addresses.js');
const Phones = require('./Phones.js');
const EventDates = require('./EventDates.js');
const Websites = require('./Websites.js');
const InstantMessageIds = require('./InstantMessageIds.js');

const fndtnUsers = {
  '_id': mongoose.Schema.Types.ObjectId,
  'verified': Boolean,
  'job': new mongoose.Schema(Job),
  'name': new mongoose.Schema(Name),
  'account': new mongoose.Schema(Account),
  'emails': [new mongoose.Schema(Emails)],
  'birthday': Date,
  'addresses': [new mongoose.Schema(Addresses)],
  'phones': [new mongoose.Schema(Phones)],
  'eventDates': [new mongoose.Schema(EventDates)],
  'websites': [new mongoose.Schema(Websites)],
  'instantMessageIds': [new mongoose.Schema(InstantMessageIds)]
}

module.exports = fndtnUsers;
