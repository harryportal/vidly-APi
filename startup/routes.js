const genres = require('../routes/genres');
const customers = require('../routes/customers');
const movies = require('../routes/movies');
const rentals = require('../routes/rentals');
const users = require('../routes/users');
const express = require('express');
const error = require('../middleware/error');

module.exports = function(app){
    app.use(express.json());
    app.use('/api/genres', genres); 
    app.use('/api/customers', customers);
    app.use('/api/movies', movies); 
    app.use('/api/rentals', rentals);
    app.user('/api/users', users)
    app.use(error)
}