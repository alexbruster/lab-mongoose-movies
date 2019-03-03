const express = require('express');
const router = express.Router();

const Celebrity = require('../models/celebrity');

// celebrities index
router.get('/', async (req, res, next) => {
  try {
    const celebrity = await Celebrity.find();
    res.render('celebrities/index', { celebrity });
  } catch (error) {
    next(error);
  }
});

// show celebrity
router.get('/:id/show', async (req, res, next) => {
  const { id } = req.params;
  try {
    const celebrityId = await Celebrity.findById(id);
    res.render('celebrities/show', celebrityId);
  } catch (error) {
    next(error);
  }
});

// create celebrities
router.get('/new', (req, res, next) => {
  res.render('celebrities/new');
});

router.post('/', async (req, res, next) => {
  const { name, occupation, catchPhrase } = req.body;
  let celebrity = { name, occupation, catchPhrase };
  try {
    await Celebrity.create(celebrity);
    res.redirect('/celebrities');
  } catch (error) {
    next(error);
  }
});

// delete celebrities
router.post('/:id/delete', async (req, res, next) => {
  const { id } = req.params;
  try {
    await Celebrity.findByIdAndRemove(id);
    res.redirect('/celebrities');
  } catch (error) {
    next(error);
  }
});

// edit celeb
router.get('/:id/edit', async (req, res, next) => {
  const { id } = req.params;
  try {
    const celebrityId = await Celebrity.findById(id);
    res.render('celebrities/edit', celebrityId);
  } catch (error) {
    next(error);
  }
});

router.post('/:id', async (req, res, next) => {
  const { id, name, occupation, catchPhrase } = req.body;
  const updateCeleb = { name, occupation, catchPhrase };
  try {
    await Celebrity.update(id, updateCeleb);
    res.redirect('/celebrities');
  } catch (error) {
    next(error);
  }
});

module.exports = router;
