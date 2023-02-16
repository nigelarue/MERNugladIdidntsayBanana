const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/googlebooks', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = mongoose.connection;

// uses the mongoose module to connect to a MongoDB database. It connects to the database specified in the MONGODB_URI environment variable, or to the default database mongodb://127.0.0.1:27017/googlebooks if the environment variable is not defined.

// The useNewUrlParser and useUnifiedTopology options are passed to the mongoose.connect() method to ensure that the MongoDB Node.js driver can use the latest and most stable connection string parser and topology engine.