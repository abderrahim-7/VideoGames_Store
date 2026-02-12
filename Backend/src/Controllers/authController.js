const user = require('../models/User');
const jwt = require("jsonwebtoken");

const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, email: user.email }, 
    process.env.JWT_SECRET,              
    { expiresIn: "1d" }
  );
};

const signUp = async (req,res) => {
    try{
        const {username, email, password} = req.body;

        const existingUsername = await user.findOne({username : username});
        if (existingUsername){
            return res.status(409).json({message : "This username is already in use"})
        }
        const existingEmail = await user.findOne({email : email});
        if (existingEmail){
            return res.status(409).json({message : "This email is already in use"})
        }

        const newUser = new user({username,email,password})
        await newUser.save()

        const token = generateToken(newUser)

        res.status(201).json({
            message : 'User created successfully',
            userId:newUser._id,
            token
        })

    }
    catch(err){
        res.status(500).json({ message: "Server error", error: err.message });
    }
}

const Login = async (req,res) =>{
    try{

        const {email,password} = req.body;

        const newUser = await user.findOne({email:email})
        if (!newUser){
            return res.status(401).json({message: "Invalid credentials"})
        }

        const correctPassword = await newUser.comparePassword(password)
        if (!correctPassword){
             return res.status(401).json({message: "Invalid credentials"})
        }

        const token = generateToken(newUser)
        
        res.status(200).json({
            message : "user logged in successfully",
            userId:newUser._id,
            token,
        })

    }
    catch(err){
        res.status(500).json({message:"server error",error: err.message})
    }

}

const deleteUser = async (req,res)=>{
    try{

        const userId = req.user.id

        await user.findByIdAndDelete(userId);

        res.json({message : "account deleted successfully"});

    }
    catch(err){
        res.status(500).json({message : "server error",error:err.message})
    }
}

const updateEmail = async (req,res) => {
    try{
        
        const userId = req.user.id
        const {newEmail} = req.body

        if (!newEmail){
            res.status(400).json({message : "New email is required"})
        }


        const taken = await user.findOne({email:newEmail})

        if (taken && taken.id !== userId){
            res.status(401).json({message : "this email is already taken"})
        }

        const newUser = await user.findByIdAndUpdate(
            userId,
            {email:newEmail},
            {new:true}
        )
        
        res.status(200).json({
            message : "email updated successfully",
            userId:newUser._id,
        })

    }
    catch(err){
        res.status(500).json({message : "server error",error:err.message})     
    }
}

const updatePassword = async (req, res) => {
  try {
    const userId = req.user.id;
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({ message: "Both current and new passwords are required" });
    }

    const User = await user.findById(userId);

    const isMatch = await User.comparePassword(currentPassword);
    if (!isMatch) {
      return res.status(401).json({ message: "Current password is incorrect" });
    }

    User.password = newPassword;
    await User.save();

    res.json({ message: "Password updated successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};


module.exports = {signUp,Login,deleteUser,updateEmail,updatePassword}