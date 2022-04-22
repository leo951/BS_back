const dbConfig = require('./db.configs');
const serverConfig = require('./server.config');
const jwtConfig = require('./jwt.configs');

exports.database = dbConfig;
exports.server = serverConfig;
exports.jwt = jwtConfig;