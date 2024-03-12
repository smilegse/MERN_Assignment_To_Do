const mongoose = require('mongoose');

const DatabaseSchema = mongoose.Schema({
    email: {type:String,require:true},
    title: {type:String, require:true},
    description: {type:String, require:true},
    status: {type:String, require:true}
},{timestamps: true, versionKey: false});

const ToDosModel = mongoose.model('todos', DatabaseSchema);

module.exports = ToDosModel;