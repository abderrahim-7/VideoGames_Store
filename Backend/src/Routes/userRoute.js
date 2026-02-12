const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware")

const {getUser,changeName,getWishlist,addGameToWishlist,removeGameFromWishlist,getCart,addGameToCart,removeGameFromCart,getOwnedGames,buyGame,buyCart,getPaymentMethode,addPaymentMethod,removePaymentMethod} = require("../Controllers/userController");

router.get("/getUser",auth,getUser)
router.patch("/updateUser",auth,changeName)
router.get("/wishlist",auth,getWishlist)
router.put("/addToWishlist",auth,addGameToWishlist)
router.delete("/removeFromWishlist",auth,removeGameFromWishlist)
router.get("/cart",auth,getCart)
router.put("/addToCart",auth,addGameToCart)
router.delete("/removeFromCart",auth,removeGameFromCart)
router.get("/ownedGames",auth,getOwnedGames)
router.post("/buyGame",auth,buyGame)
router.post("/buyCart",auth,buyCart)
router.get("/paymentMethod",auth,getPaymentMethode)
router.put("/addPaymentMethod",auth,addPaymentMethod)
router.delete("/removePaymentMethod",auth,removePaymentMethod)

module.exports = router;