const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware")

const { signUp,Login,deleteUser,updateEmail,updatePassword } = require("../Controllers/authController");

router.post("/signup",signUp);
router.post("/login",Login);
router.delete("/delete",auth,deleteUser)
router.patch("/updateEmail",auth,updateEmail)
router.patch("/updatePassword",auth,updatePassword)


module.exports = router;