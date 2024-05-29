export default {
  api: {
    prefix: '/api/v1',
  },
  dbNameApp: process.env.DB_NAME_APP || 'suequipo',
  dbUriApp: process.env.MONGO_URI_APP || 'mongodb://localhost:27017',
  logFile: process.env.LOG_FILE || `${ __dirname }/../../logs/debug.log`,
  port: process.env.PORT || '4500',
  saltRounds: process.env.SALT_ROUNDS || '10',
  secretKey: process.env.SECRET_KEY || 'SECRET_KEY'
}