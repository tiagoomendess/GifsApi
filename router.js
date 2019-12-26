const express = require('express');
let PlayerAPI = require('./server/players');
let GifsAPI = require('./server/gifs');
let CategoriesAPI = require('./server/categories');

function initialize() {
  
  let api = express();

  api.use('/team', PlayerAPI());
  api.use('/giphys', GifsAPI());
  api.use('/categories', CategoriesAPI());

  return api;
}

module.exports = {
  initialize: initialize,
};