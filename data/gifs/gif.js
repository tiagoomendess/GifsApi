let mongoose = require('mongoose');
let Schema = mongoose.Schema;

// create a schema
let GifSchema = new Schema({
    url: { type: String, required: true , unique: true},
    category_id: { type: String, required: true }
});

let Gif = mongoose.model('Gif', GifSchema);

module.exports = Gif;