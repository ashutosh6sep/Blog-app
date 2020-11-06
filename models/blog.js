const mongoose = require('./mongo'); //importing connection config
const autoIncrement= require('mongoose-auto-increment');
var Blog = new mongoose.Schema({
  blogId: Number,
  title: String,
  content:String,
  createdBy : String,
  createdOn : {type: Date, default: Date.now},
  updatedBy : String,
  updatedOn : {type: Date, default: Date.now}
});


Blog.plugin(autoIncrement.plugin,{model:'Blog', field:'blogId', startAt:1})
// making the above schema as model
module.exports = mongoose.model('Blog', Blog)