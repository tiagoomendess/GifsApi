function GifService(GifModel) {

    let service = {
        create,
        findAll,
        findById,
        update,
        deleteById,
        findByCategoryId
    };

    function create(values) {
        let newGif = GifModel(values);
        return save(newGif);
    }

    function save(newGif) {
        return new Promise(function (resolve, reject) {
            newGif.save(function (err) {
                if (err) reject(err);
                resolve(newGif);
            });
        });
    }

    function findAll() {
        return new Promise(function (resolve, reject) {
            GifModel.find({}, function (err, categories) {
                if (err) reject(err);
                resolve(categories);
            });
        });
    }

    function findById(id) {
        return new Promise(function(resolve, reject) {
            GifModel.findById(id, function(err, gif) {
                if (err) reject(err);
                resolve(gif);
            });
        });
    }

    function update(id, values) {
        return new Promise(function(resolve, reject) {
            GifModel.update({ _id: id }, values, function(err, afected) {
                if (err) reject(err);
                resolve(afected);
            });
        });
    }

    function deleteById(id) {
        return new Promise(function(resolve, reject) {
            GifModel.deleteOne({ _id: id }, function(err) {
                if (err) reject(err);
                resolve({"success": "true"});
            });
        });
    }

    function findByCategoryId(id) {
        return new Promise(function(resolve, reject) {
            GifModel.find({ category_id: id}, function(err, gifs) {
                if (err) reject(err);
                resolve(gifs);
            });
        });
    }

    return service;

}

module.exports = GifService;