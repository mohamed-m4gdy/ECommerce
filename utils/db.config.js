const mongoose = require("mongoose");
const config = require('./config')
const conc = 'mongodb://localhost:27017/x-store';
mongoose.connect(config.mongoUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
});

module.exports = conc;
