var GifModel = require('./gif');
var GifService = require('./service');

var service = GifService(GifModel);

module.exports = service;