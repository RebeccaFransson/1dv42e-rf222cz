"use strict";
var mongoose = require('mongoose');

var usersSchema = mongoose.Schema({
    user_id: String,
    nickname: String,
    last_save: Date,
});

module.exports = mongoose.model("user", usersSchema);
