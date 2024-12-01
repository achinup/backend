const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const farmerRoutes = require('./routes/farmerRoutes');
const orderRoutes = require("./routes/orderRoutes");
const cors = require('cors'); 
dotenv.config();

const app = express();
app.use(express.json());

// Connect to MongoDB
app.use(cors());
connectDB();

// Use Routes
app.use('/api/auth', authRoutes);
app.use('/api/farmers', farmerRoutes);
app.use("/api/item", orderRoutes); // Add farmer routes


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
