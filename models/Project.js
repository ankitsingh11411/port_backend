const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  githubLink: { type: String, required: true },
  images: [{ type: String, required: true }],
});

module.exports = mongoose.model('Project', ProjectSchema);
