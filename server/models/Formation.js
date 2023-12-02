const mongoose = require('mongoose');

// Define a Schema
const formationSchema = new mongoose.Schema({
    name: String // Simple schema with just a name field
});

// Create a Model
const Formation = mongoose.model('Formation', formationSchema);

module.exports = Formation; // Export the model
