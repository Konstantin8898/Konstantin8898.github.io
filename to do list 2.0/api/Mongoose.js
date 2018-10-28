var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/todo', { useNewUrlParser: true });
var db = mongoose.connection;

db.on('error', function (err) {
    console.log('connection error:', err.message);
});
db.once('open', function callback () {
    console.log("Connected to DB!");
});

var Schema = mongoose.Schema;

// Schemas
var Action = new Schema({
    done: { type: Boolean, required: true },
    text: { type: String, required: true }
});

var ActionModel = mongoose.model('Action', Action);

module.exports.ActionModel = ActionModel;
