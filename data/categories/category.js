let mongoose = require('mongoose');
let Schema = mongoose.Schema;

// create a schema
let CategorySchema = new Schema({
    name: { type: String, required: true, unique: true },
    description: { type: String, required: false }
});

let Category = mongoose.model('Category', CategorySchema);

module.exports = Category;