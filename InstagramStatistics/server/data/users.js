"use strict";
var mongoose = require('mongoose');

var usersSchema = mongoose.Schema({
    user_id: String,
    nickname: String,
    last_save: Date,
    mediaOverTime: Array,
    followed_byOverTime: Array,
    access_token: String
});

module.exports = mongoose.model('User', usersSchema, 'user');
