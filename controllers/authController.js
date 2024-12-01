const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register a new user
exports.register = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const existingUser = await User.findOne({ email }); // Rename the variable to existingUser
        if (!existingUser) {
            const newUser = new User({ username, email, password }); // Create a newUser object
            await newUser.save();
            res.status(201).json({ message: "User registered successfully",
                User: {
                username: newUser.username,
                email: newUser.email,
                // Include any other user details you'd like to return
              },});
        } else {
            res.status(400).json({ message: "User already exists"});
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
// Login an existing user
exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        // alert(email)
        if (!user)  return res.status(400).json({ message: "Invalid credentials user"+user});
        
        const isMatch = await bcrypt.compare(password, user.password);
      
        if (!isMatch) return res.status(400).json({ message: " password did't match" +isMatch});

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({
            token,
            User: {
              username: user.username,
              email: user.email,
              // Include any other user details you'd like to return
            },
          });
    } catch (error) {
        
        res.status(500).json({ error: error.message });
    }
};


exports.deleteuser = async (req, res) => {
    const { username } = req.query;
  
    if (!username) {
      return res.status(400).json({ error: "user name is required." });
    }
  
    try {
      const user = await User.findOneAndDelete({ username });
  
      if (!user) {
        return res.status(404).json({ error: "user not found." });
      }
  
      res.status(200).json({ message: "user profile deleted successfully." });
    } catch (err) {
      console.error("Error deleting user:", err);
      res.status(500).json({ error: "Failed to delete user profile." });
    }
  };