const logger = require('./App/Utils/logger');
const connectToDb = require('./App/Utils/db');
const app = require('./App/app');
const config = require('./App/Utils/config');

connectToDb()
  .then(() => {
    logger.info('Connected to Database');
    app.listen(config.PORT, () => {
      logger.info(`Server is running on PORT ${config.PORT}`);
    });
  })
  .catch((error) => logger.error('Error was encountered', error.message));
