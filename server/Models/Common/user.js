var mongoose = require('mongoose')
var userSchema = require('../../Schemas/Common/user')
var user = mongoose.model('user',userSchema)

module.exports = user