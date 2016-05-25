"use strict";
var mongoose = require('mongoose');

var usersSchema = mongoose.Schema({
    user_id: String,
    nickname: String,
    profile_picture: String,
    last_save: { type: Date, default: Date.now },
    counts: Object,
    topThree: Array,
    access_token: String
});

module.exports = mongoose.model('User', usersSchema, 'user');
