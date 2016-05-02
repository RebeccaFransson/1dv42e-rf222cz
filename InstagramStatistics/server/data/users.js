var mongoose = require('mongoose');

var usersSchema = mongoose.Schema({
    id: String,
    nickname: String
});

module.exports = mongoose.model("user", usersSchema);
