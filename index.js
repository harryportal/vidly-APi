const app = express();
const config = require('config');
const error = require('./middleware/error');
const winston = require('winston');

require('./startup/routes')(app);
require('./startup/logging')();
require('./startup/config')();
require('./startup/db')();
require('./startup/validation')();



const port = process.env.PORT || 3000;
app.listen(port, () => winston.info(`Listening on port ${port}...`));
