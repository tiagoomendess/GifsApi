const bodyParser = require('body-parser');
const express = require('express');
const Gifs = require('../data/gifs');
const Categories = require('../data/categories');

function GifRouter() {
    
    let router = express();

    router.use(bodyParser.json({ limit: '100mb' }));
    router.use(bodyParser.urlencoded({ limit: '100mb', extended: true }));

    router.route('/')
        .get(function(req, res, next) {
            console.log("GET /giphys");
            Gifs.findAll()
                .then(function(gifs) {
                    res.status(200);
                    res.send(gifs);
                    next();
                })
                .catch(function(err) {
                    res.status(401);
                    res.send(err);
                    next();
                });
        })
        .post(function(req, res, next) {
            console.log("POST /giphys");

            Categories.findById(req.body.category_id)
                .then(function(category) {

                    Gifs.create(req.body)
                        .then(function (gif) {
                        res.status(200);
                        res.send(gif);
                        })

                        .catch(function(err) {
                            res.status(401);
                            res.send(err);
                            next();
                        });

                })
                .catch(function(err) {
                    res.status(401);
                    res.send({ "error": "Categoria inválida"});
                    next();
                });
            
        });

        router.route('/:id')

            .get(function(req, res, next) {
                Gifs.findById(req.params.id).then(function(gif) {
                    res.send(gif);
                    next();
                }).catch(function(err) {
                    res.status(401);
                    res.send(err);
                    next();
                });
            })
            .put(function(req, res, next) {

                Gifs.update(req.params.id, req.body)
                    .then(function(afected) {
                        res.send(afected);
                        next();
                    })
                    .catch(function(err) {
                        res.status(401);
                        res.send(err);
                        next();
                    });

            })
            .delete(function(req, res, next) {
                Gifs.deleteById(req.params.id)
                    .then(function(gif) {
                        res.send(gif);
                        next();
                    })
                    .catch(function(err) {
                        res.status(401);
                        res.send(error);
                        next();
                    });
            });

            router.route('/categories/:id').get(function(req,res,next) {

                Gifs.findByCategoryId(req.params.id).then(function(gifs) {
                    res.send(gifs);
                    next();
                }).catch(function(err) {
                    res.status(401);
                    res.send(err);
                    next();
                });
            });

    return router;
}

module.exports = GifRouter;