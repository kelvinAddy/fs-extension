const config = require('./config');
const logger = require('../Utils/logger');
const mongoose = require('mongoose');

const connectToDb = async () => {
  logger.info('Connecting to the Database.....');
  mongoose.connect(config.MONGODB_URI, { family: 4 });
};

module.exports = connectToDb;
