const express = require('express');
const router = express.Router();
const { getAllMovies, getMovie, getAllMoviesWithRatings} = require('../../models/movie');

const sendJSONresp = (req, res, next) => res.json(res.rows);

// handle all the routes

// get all movies
router.route('/')
.get(getAllMovies, /*sendJSONres  or */ (req, res) => res.json(res.rows));




// Get movies withrating BONUS
router.route('/withratings')
.get(getAllMoviesWithRatings, /*sendJSONres  or */ (req, res) => res.json(res.rows));


// Get single movie
router.route('/:id')
.get(getMovie, /*sendJSONres  or */ (req, res) => res.json(res.rows));


module.exports = router;
