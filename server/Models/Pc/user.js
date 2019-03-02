var mongoose = require('mongoose')
var userSchema = require('../../Schemas/Pc/user')
var user = mongoose.model('user',userSchema)

module.exports = user