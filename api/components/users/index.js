// const store = require('./../../../store/dummy'); // Dummy DB store
// const store = require('./../../../store/mysql'); // MYSQL connection
const store = require('./../../../store/remote-mysql'); // MYSQL service
const crtl = require('./controller');

module.exports = crtl(store);