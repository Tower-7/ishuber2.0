var mongoose = require('mongoose')
var ProjectSchema = require('../../Schemas/Admin/project')
var Project = mongoose.model('Project',ProjectSchema)

module.exports = Project