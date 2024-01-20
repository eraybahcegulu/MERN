const mongoose = require('mongoose');

module.exports = {
    connect: function () {
        mongoose.connect(process.env.MONGODB_URI);
        mongoose.connection.on('connected', () => {
            console.log('Connected to MongoDB');
        });
        mongoose.connection.on('error', (err) => {
            console.error('MongoDB connection error', err);
        });
    }
};