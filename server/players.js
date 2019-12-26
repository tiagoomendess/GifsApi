const bodyParser = require('body-parser');
const express = require('express');
const Players = require('../data/players')

function PlayerRouter() {
  let router = express();

  router.use(bodyParser.json({ limit: '100mb' }));
  router.use(bodyParser.urlencoded({ limit: '100mb', extended: true }));

  router.route('/players')
    .get(function (req, res, next) {
      console.log('get all Players');
      Players.findAll()
        .then((players)=> {
          res.send(players);
          next();
        })
        .catch((err) => {
          next();
        });
    })
    .post(function (req, res, next) {
      console.log('post');
      let body = req.body;
      Players.create(body)
        .then(() => {
          console.log('gravei');
          res.status(200);
          res.send(body);
          next();
        })
        .catch((err) => {
           console.log('Ja existe');
           err.status = err.status || 500;
           res.status(401);
           next();
        });
    });

  router.route('/players/:playerId')
    .get(function (req, res, next) {
      console.log('get for one Id');
      let playerId = req.params.playerId;
      console.log(playerId);
      Players.findById(playerId)
        .then((player) => {
          res.status(200);
          res.send(player);
          next();
        })
        .catch((err) => {
          res.status(404);
          next();
        });
    })
    .put(function (req, res, next) {
      console.log('update for one Id');
      let playerId = req.params.playerId;
      let body = req.param.body;

      Players.update(playerId, body)
        .then((player) => {
          res.status(200);
          res.send(player);
          next();
        })
        .catch((err) => {
          res.status(404);
          next();
        });
    })
    .delete(function (req, res, next) {
      console.log('del for one Id');
      let playerId = req.params.playerId;
      Players.removeById(playerId)
        .then(() => {
          console.log('test');
          res.status(200).json();
          next();
        })
        .catch((err) => {
          console.log('err');
          res.status(404);
          next();
        });
    });

  return router;
}

module.exports = PlayerRouter;