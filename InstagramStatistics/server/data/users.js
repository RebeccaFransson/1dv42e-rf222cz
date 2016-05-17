"use strict";
var mongoose = require('mongoose');

var usersSchema = mongoose.Schema({
    user_id: String,
    nickname: String,
    profile_picture: String,
    last_save: Date,
    counts: Object,
    topTen: Array,
    access_token: String
});

module.exports = mongoose.model('User', usersSchema, 'user');
