var mongoose = require('mongoose');

var usersSchema = mongoose.Schema({
    id: Number,
    nickname: String
});

module.exports = mongoose.model("user", usersSchema);
