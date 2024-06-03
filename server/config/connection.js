// This is where we are connecting to our database. The database will be round_aboutsdb
const mongoose= require('mongoose');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/round_aboutsdb');

module.exports = mongoose.connection;

