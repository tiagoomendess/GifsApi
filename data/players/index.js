var Players = require('./player');
var PlayersService = require('./service');

var service = PlayersService(Players);

module.exports = service;