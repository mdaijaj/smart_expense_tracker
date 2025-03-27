const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../model/user_model");


const signup = async (req, res) => {
  try{
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  }
  catch(error){
    console.error('Failed to register:', error);
    throw error;
  }
}


const login = async (req, res) => {
  try{
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });
  
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
    res.json({ token, userId: user._id });
  }
  catch(error){
    console.error('Failed to login:', error);
    throw error;
  }
}


const profielDetails = async (req, res, next) => {
  const userId=req.userId
  try {
    const user = await User.findById(userId).select("-password"); 
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).send({message: "User Fetch Successfully", user});
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};


const updateProfile = async (token, profileData) => {
  try{
    const user = await User.findByIdAndUpdate(token, profileData, { new: true });
    return user;
  }
  catch(error){
    console.error('Failed to update profile:', error);
    throw error;
  }
};

module.exports = {
    signup,
    login,
    profielDetails,
    updateProfile
}
