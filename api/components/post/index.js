// const store = require('./../../../store/dummy');
const store = require('./../../../store/mysql');
const crtl = require('./controller');

module.exports = crtl(store);