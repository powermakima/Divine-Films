const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  thumbnail: { type: String },
  videoUrl: { type: String, required: true },
  duration: { type: String },
  rating: { type: Number, default: 0 },
  director: { type: String },
  cast: [{ type: String }],
  releaseDate: { type: Date },
}, { timestamps: true });

module.exports = mongoose.model('Movie', movieSchema);