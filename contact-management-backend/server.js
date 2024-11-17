const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const contactRoutes = require('./Routes/ContactRoutes');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB connection
mongoose
  .connect('mongodb://localhost:27017/contactDB', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.error('MongoDB connection failed:', err.message));

// Routes
app.use('/contacts', contactRoutes);

// Server listening on port 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
