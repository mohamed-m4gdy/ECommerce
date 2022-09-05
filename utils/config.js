module.exports = {
  port: parseInt(process.env.PORT) || 7000,
  mongoUrl: process.env.MONGO_URL || 'mongodb://localhost:27017/x-store'
}
