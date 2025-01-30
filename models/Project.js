const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  githubLink: { type: String, required: true },
  deployedLink: { type: String, required: true },
});

module.exports = mongoose.model('Project', ProjectSchema);
