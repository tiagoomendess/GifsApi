const bodyParser = require('body-parser');
const express = require('express');
const Categories = require('../data/categories');

function CategoryRouter() {
    
    let router = express();
    
    router.use(bodyParser.json({ limit: '100mb' }));
    router.use(bodyParser.urlencoded({ limit: '100mb', extended: true }));

    router.route('/')
        .post(function (req, res, next) {
            console.log('POST /categories');
            let body = req.body;
            Categories.create(body)
                .then(() => {
                    console.log('Categoria guardada');
                    res.status(200);
                    body.success = "true";
                    res.send(body);
                    next();
                }).catch((err) => {
                    console.log('Erro a criar categoria');
                    res.status(401);
                    res.send({ "success": "false"});
                    next();
                });
        }).get(function (req, res, next) {
            console.log('GET /categories');

            Categories.findAll()
                .then((categories) => {
                    res.status(200);
                    res.send(categories);
                    next();
                })
                .catch((err) => {
                    console.log("Erro no get /categorias");
                    res.status(401);
                    res.send();
                    next();
                });
        });

    router.route('/:id')
        .get(function(req, res, next) {
            console.log('GET /categories/' + req.params.id);
            Categories.findById(req.params.id)
                .then(function(category) {
                    category.success = "true";
                    res.send(category);
                    next();
                })
                .catch(function(err) {
                    res.status(404);
                    res.send();
                    next();
                });
        })
        .put(function(req, res, next) {
            console.log('PUT /categories/' + req.params.id);
            Categories.update(req.params.id, req.body)
            .then(function(afected) {
                res.status(200);
                res.send(afected);
            })
            .catch(function(err) {
                res.status(401);
                next();
            });
        })
        .delete(function(req, res, next) {
            console.log('DELETE /categories/' + req.params.id);

            Categories.deleteById(req.params.id)
                .then(function(info) {
                    res.status(200);
                    res.send(info);
                })
                .catch(function(err) {
                    res.status(401);
                    res.send();
                });
        });

    return router;
}

module.exports = CategoryRouter;