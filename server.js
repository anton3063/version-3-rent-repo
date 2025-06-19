// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
require('dotenv').config();

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define basic User and Listing models
const User = mongoose.model('User', new mongoose.Schema({
  name: String,
  email: String,
  postcode: String,
  profilePic: String,
}));

const Listing = mongoose.model('Listing', new mongoose.Schema({
  title: String,
  description: String,
  category: String,
  price: Number,
  duration: Number,
  pricingType: String,
  photoUrl: String,
  ownerEmail: String,
}));

// Sample route to get listings by user
app.get('/api/dashboard', async (req, res) => {
  const { email } = req.query;
  const user = await User.findOne({ email });
  const listings = await Listing.find({ ownerEmail: email });
  res.json({ user, listings });
});

// Server listening
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
