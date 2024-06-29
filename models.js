const mongoose = require('mongoose');

// Snippet schema
const snippetSchema = new mongoose.Schema({
  title: { type: String, required: true },
  code: { type: String, required: true },
  language: { type: String, required: true },
  description: { type: String, required: true },
  author: { type: String, required: true },
  customId: { type: String, required: true, unique: true }, // Custom ID for user reference
});

const Snippet = mongoose.model('Snippet', snippetSchema);

module.exports = {
  Snippet,
};
