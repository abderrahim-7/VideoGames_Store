const express = require("express");
const router = express.Router();

const {getAllGames,getGameByID,getGameByName,getHighlyRated,getNewReleases,getOnSale} = require("../Controllers/gameController");

router.get("/", getAllGames);                    
router.get("/search", getGameByID);            
router.get("/searchName", getGameByName);       
router.get("/highlyRated", getHighlyRated);     
router.get("/newReleases", getNewReleases);     
router.get("/onSale", getOnSale);                

module.exports = router;
