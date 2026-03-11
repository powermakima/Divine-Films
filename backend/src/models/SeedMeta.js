const mongoose = require('mongoose');

const seedMetaSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true, trim: true },
    completedAt: { type: Date, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('SeedMeta', seedMetaSchema);
