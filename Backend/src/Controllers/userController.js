const Game = require("../models/Game");
const User = require("../models/User");

const getUser = async (req,res) => {
    try{
        const user = req.user;
        res.status(200).json({message : "user infos send successfully",username : user.username, email : user.email})
    }
    catch(err){
        res.status(500).json({message : "server error",error : err.message})
    }
}

const changeName = async (req, res) => {
    try {
        const user = req.user;
        const { newName } = req.body;

        if (!newName || newName.trim() === "") {
            return res.status(400).json({ message: "New username is required" });
        }

        const existingUser = await User.findOne({ username: newName });

        if (existingUser && existingUser.id !== user.id) {
            return res.status(400).json({ message: "Username is already taken" });
        }

        user.username = newName;
        await user.save();

        res.status(200).json({ message: "Username updated" });

    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};


const getWishlist = async (req,res) => {
    try{
        const userId = req.user?.id ;

        const user = await User.findById(userId)
            .populate("wishlist")
            .select("wishlist");

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json(user.wishlist);   
    }
    catch(err){
        res.status(500).json({message : "server error",error : err.message})
    }
}

const addGameToWishlist = async (req,res) => {
    try{
        const user = req.user
        const {gameId} = req.body 

        if (!gameId) {
            return res.status(400).json({ message: "Missing game ID" });
        }

        if (user.ownedGames.includes(gameId)) {
            return res.status(400).json({ message: "Game already owned" });
        }

        if (user.wishlist.includes(gameId)) {
            return res.status(400).json({ message: "Game already in wishlist" });
        }

        user.wishlist.push(gameId);
        await user.save();

        res.status(200).json({message : "game added successfully"})

    }
    catch(err){
        res.status(500).json({message : "server error",error : err.message})
    }
}

const removeGameFromWishlist = async (req,res) => {
    try{
        const user = req.user;
        const {gameId} = req.body; 

        if (!user.wishlist.includes(gameId)){
            return res.status(404).json({message : "Game not in wishlist"})
        }

        user.wishlist = user.wishlist.filter(id => id != gameId)
        await user.save()
        res.status(200).json({message : "game removed successfully"})
    }
    catch(err){
        res.status(500).json({message : "server error",error : err.message})
    }
}

const getCart = async (req,res) => {
    try{
        const userId = req.user?.id ;

        const user = await User.findById(userId)
            .populate("cart")
            .select("cart");

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        
        res.json(user.cart);   
    }
    catch(err){
        res.status(500).json({message : "server error",error : err.message})
    }
}

const addGameToCart = async (req,res) => {
    try{
        const user = req.user
        const {gameId} = req.body 

        if (!gameId) {
            return res.status(400).json({ message: "Missing game ID" });
        }

        if (user.ownedGames.includes(gameId)) {
            return res.status(400).json({ message: "Game already owned" });
        }

        if (user.cart.includes(gameId)) {
            return res.status(400).json({ message: "Game already in the cart" });
        }

        user.cart.push(gameId);
        await user.save();
        
        res.status(200).json({message : "game added successfully"})

    }
    catch(err){
        res.status(500).json({message : "server error",error : err.message})
    }
}

const removeGameFromCart = async (req,res) => {
    try{
        const user = req.user;
        const {gameId} = req.body; 

        if (!user.cart.includes(gameId)){
            return res.status(404).json({message : "Game not in cart"})
        }
        
        user.cart = user.cart.filter(id => id != gameId)
        await user.save()
        res.status(200).json({message : "game removed successfully"})
    }
    catch(err){
        res.status(500).json({message : "server error",error : err.message})
    }
}

const getOwnedGames = async (req,res) => {
    try{
        const userId = req.user?.id ;

        const user = await User.findById(userId)
            .populate("ownedGames")
            .select("ownedGames");

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        
        res.json(user.ownedGames);   
    }
    catch(err){
        res.status(500).json({message : "server error",error : err.message})
    }
}

const buyGame = async (req, res) => {
    try {
        const { user } = req;
        const { gameId, paymentMethod } = req.body;

        const game = await Game.findById(gameId);
        if (!game) return res.status(404).json({ message: "Game not found" });

        if (game.price > 0 && !paymentMethod) {
            return res.status(400).json({ message: "A payment method is required" });
        }

        let chosenPayment = null;
        if (paymentMethod) {
            if (paymentMethod.useSaved) {
                chosenPayment = user.paymentMethods.find(pm => pm.cardNumber.toString() === paymentMethod.cardNumber);
                if (!chosenPayment) return res.status(400).json({ message: "Saved payment method not found" });
            } else {
                const { type, cardNumber, expiryDate, holderName } = paymentMethod;
                if (!type || !cardNumber || !expiryDate || !holderName) {
                    return res.status(400).json({ message: "Incomplete payment details" });
                }
                chosenPayment = paymentMethod;
            }
        }

        if (!user.ownedGames.includes(game._id)) user.ownedGames.push(game._id);

        user.cart = user.cart.filter(id => id.toString() !== game._id.toString());


        user.wishlist = user.wishlist.filter(id => id.toString() !== game._id.toString());

        await user.save();
        res.status(200).json({ message: "Game purchased successfully" });

    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};


const buyCart = async (req, res) => {
    try {
        const { user } = req;
        const { paymentMethod } = req.body;

        if (user.cart.length === 0) return res.status(400).json({ message: "Cart is empty" });

        const games = await Game.find({ _id: { $in: user.cart } });
        const totalPrice = games.reduce((sum, g) => sum + g.price, 0);

        if (totalPrice > 0 && !paymentMethod) return res.status(400).json({ message: "A payment method is required" });

        let chosenPayment = null;
        if (paymentMethod) {
            if (paymentMethod.useSaved) {
                chosenPayment = user.paymentMethods.find(pm => pm.cardNumber.toString() === paymentMethod.cardNumber);
                if (!chosenPayment) return res.status(400).json({ message: "Saved payment method not found" });
            } else {
                const { type, cardNumber, expiryDate, holderName } = paymentMethod;
                if (!type || !cardNumber || !expiryDate || !holderName) {
                    return res.status(400).json({ message: "Incomplete payment details" });
                }
                chosenPayment = paymentMethod;
            }
        }
        user.cart.forEach(gameId => {
            if (!user.ownedGames.includes(gameId)) user.ownedGames.push(gameId);
        });
        user.wishlist = user.wishlist.filter(id => !user.cart.includes(id));
        user.cart = [];

        await user.save();
        res.status(200).json({ message: "Games purchased successfully" });

    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};


const getPaymentMethode = async (req,res) => {
    try{
        const user = req.user

        return res.status(200).json({paymentMethods : user.paymentMethods})
    }
    catch(err){
        res.status(500).json({message : "server error",error : err.message})
    }
}

const addPaymentMethod = async (req,res) => {
    try{
        const user = req.user
        const {type,cardNumber,expiryDate,holderName} = req.body 

        if (!type || !cardNumber || !expiryDate || !holderName) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        const alreadyExists = user.paymentMethods.some(
            (method) => method.cardNumber === cardNumber
        );
        if (alreadyExists) {
            return res.status(400).json({ message: "Payment method already exists" });
        }

        user.paymentMethods.push({type,cardNumber,expiryDate,holderName,useSaved:true});
        await user.save();
        res.status(200).json({message : "payment method added successfully"})

    }
    catch(err){
        res.status(500).json({message : "server error",error : err.message})
    }
}

const removePaymentMethod = async (req,res) => {
    try{
        const user = req.user;
        const {cardNum} = req.body;

        if(!cardNum){
             return res.status(400).json({ message: "Missing required fields" });
        }

        const Exists = user.paymentMethods.some(
            (method) => method.cardNumber === cardNum
        );

        if(!Exists){
            return res.status(404).json({message : "payment method doesn't exist"})
        }

        user.paymentMethods = user.paymentMethods.filter(method => method.cardNumber !== cardNum)
        await user.save()

        res.status(200).json({message : "payment method removed successfully"})
    }
    catch(err){
        res.status(500).json({message : "server error",error : err.message})      
    }
}


module.exports = {
    getUser,
    changeName,
    getWishlist,
    addGameToWishlist,
    removeGameFromWishlist,
    getCart,
    addGameToCart,
    removeGameFromCart,
    getOwnedGames,
    buyGame,
    buyCart,
    getPaymentMethode,
    addPaymentMethod,
    removePaymentMethod,
}