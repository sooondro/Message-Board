const monk = require('monk');
const connectionString = 'localhost/messageBoard';
const db = monk(connectionString);

module.exports = db;
