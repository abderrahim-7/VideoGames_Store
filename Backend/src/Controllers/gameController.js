const Game = require("../models/Game");

// Get all games with pagination
const getAllGames = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) ||6;
    const skip = (page - 1) * limit;

    const [games, totalDocs] = await Promise.all([
      Game.find().skip(skip).limit(limit),
      Game.countDocuments(),
    ]);

    res.json({
      games,
      totalDocs,
      page,
      totalPages: Math.ceil(totalDocs / limit),
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get game by ID
const getGameByID = async (req, res) => {
  try {
    const { id } = req.query; 
    if (!id) return res.status(400).json({ message: "ID is required" });

    const game = await Game.findById(id);
    if (!game) return res.status(404).json({ message: "Game not found" });

    res.json(game);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get game by name
const getGameByName = async (req, res) => {
  try {
    const { name } = req.query; 
    if (!name) return res.status(400).json({ message: "Name is required" });

    const game = await Game.find({ name: new RegExp(name, "i") });
    if (!game) return res.status(404).json({ message: "Game not found" });

    res.json(game);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get highly rated games
const getHighlyRated = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const ratingThreshold = parseFloat(req.query.rating) || 4;
    const limit = parseInt(req.query.limit) ||6;
    const skip = (page - 1) * limit;

    const [games, totalDocs] = await Promise.all([
      Game.find({ rating: { $gt: ratingThreshold } })
        .sort({ rating: -1 })
        .skip(skip)
        .limit(limit),
      Game.countDocuments({ rating: { $gt: ratingThreshold } }),
    ]);

    res.json({
      games,
      totalDocs,
      page,
      limit,
      totalPages: Math.ceil(totalDocs / limit),
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get new releases (last 6 months)
const getNewReleases = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) ||6;
    const skip = (page - 1) * limit;

    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

    const [games, totalDocs] = await Promise.all([
      Game.find({ release_date: { $gte: sixMonthsAgo } })
        .sort({ release_date: -1 })
        .skip(skip)
        .limit(limit),
      Game.countDocuments({ release_date: { $gte: sixMonthsAgo } }),
    ]);

    res.json({
      games,
      totalDocs,
      page,
      limit,
      totalPages: Math.ceil(totalDocs / limit),
      hasMore: page < Math.ceil(totalDocs / limit),
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get discounted games
const getOnSale = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) ||6;
    const skip = (page - 1) * limit;

    const [games, totalDocs] = await Promise.all([
      Game.find({ discount: { $gt: 0 } })
        .sort({ discount: -1 })
        .skip(skip)
        .limit(limit),
      Game.countDocuments({ discount: { $gt: 0 } }),
    ]);

    res.json({
      games,
      totalDocs,
      page,
      limit,
      totalPages: Math.ceil(totalDocs / limit),
      hasMore: page < Math.ceil(totalDocs / limit),
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAllGames,
  getGameByID,
  getGameByName,
  getHighlyRated,
  getNewReleases,
  getOnSale,
};
