'use strict';

const express = require('express');
const router = express.Router();

const Movie = require('../models/movie');

// movies index
router.get('/', async (req, res, next) => {
  try {
    const movie = await Movie.find();
    res.render('movies/index', { movie });
  } catch (error) {
    next(error);
  }
});

// movie info
router.get('/:id/show', async (req, res, next) => {
  const { id } = req.params;
  try {
    const movieId = await Movie.findById(id);
    res.render('movies/show', movieId);
  } catch (error) {
    next(error);
  }
});

// create new movies
router.get('/new', (req, res, next) => {
  res.render('movies/new');
});

router.post('/', async (req, res, next) => {
  const { title, genre, plot } = req.body;
  const newMovie = { title, genre, plot };
  try {
    await Movie.create(newMovie);
    res.redirect('movies');
  } catch (error) {
    next(error);
  }
});

// delete movies
router.post('/:id/delete', async (req, res, next) => {
  const { id } = req.params;
  try {
    await Movie.findByIdAndRemove(id);
    res.redirect('/movies');
  } catch (error) {
    next(error);
  }
});

module.exports = router;
