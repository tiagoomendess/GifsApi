function CategoryService(CategoryModel) {

    let service = {
        create,
        findAll,
        findById,
        update,
        deleteById
    };

    function create(values) {
        let newCategory = CategoryModel(values);
        return save(newCategory);
    }

    function save(newCategory) {
        return new Promise(function (resolve, reject) {
            newCategory.save(function (err) {
                if (err) reject(err);
                resolve(newCategory);
            });
        });
    }

    function findAll() {
        return new Promise(function (resolve, reject) {
            CategoryModel.find({}, function (err, categories) {
                if (err) reject(err);
                resolve(categories);
            });
        });
    }

    function findById(id) {
        return new Promise(function(resolve, reject) {
            CategoryModel.findById(id, function(err, category) {
                if (err) reject(err);
                resolve(category);
            });
        });
    }

    function update(id, values) {
        return new Promise(function(resolve, reject) {
            CategoryModel.update({ _id: id }, values, function(err, afected) {
                if (err) reject(err);
                resolve(afected);
            });
        });
    }

    function deleteById(id) {
        return new Promise(function(resolve, reject) {
            CategoryModel.deleteOne({ _id: id }, function(err) {
                if (err) reject(err);
                resolve({"success": "true"});
            });
        });
    }

    return service;

}

module.exports = CategoryService;