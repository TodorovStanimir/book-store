const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Model = mongoose.model;
const { String, Number, Boolean, ObjectId } = Schema.Types;

const tokenBlackList = new Schema({
    token: String
});

module.exports = new Model('TokenBlackList', tokenBlackList);