// Game.js
const mongoose = require("mongoose");

const requirementSchema = new mongoose.Schema({
  os: String,
  cpu: String,
  gpu: String,
  storage: String
}, { _id: false });

const gameSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  price: { type: Number, required: true, min: 0 },
  genres: [String],
  publisher: [String],
  poster: String,
  screenshots: [String],
  min_requirement: requirementSchema,
  recommended_requirement: requirementSchema,
  release_date: Date,
  description: String,
  rating: { type: Number, min: 0, max: 5 },
  discount: { type: Number, min: 0, max: 100 }
}, { timestamps: true });

module.exports = mongoose.model("Game", gameSchema);
