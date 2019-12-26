var CategoryModel = require('./category');
var CategoryService = require('./service');

var service = CategoryService(CategoryModel);

module.exports = service;