const mongoose = require("mongoose");
const bcrypt = require("bcryptjs")

const paymentMethodSchema = new mongoose.Schema({
  type: { type: String, required: true },
  cardNumber: { type: String, required: true },
  expiryDate: { type: String },
  holderName: { type: String },
  useSaved: { type: Boolean },
}, { _id: false }); 

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email:    { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profilePicture: { type: String },
  cart: [{ type: mongoose.Schema.Types.ObjectId, ref: "Game" }],
  wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: "Game" }],
  ownedGames: [{ type: mongoose.Schema.Types.ObjectId, ref: "Game" }],
  paymentMethods: { type: [paymentMethodSchema], default: [] },
  isAdmin: { type: Boolean, default: false },
}, { timestamps: true });

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.comparePassword = function (password) {
  return bcrypt.compare(password, this.password);
};

module.exports = mongoose.model("User", userSchema);