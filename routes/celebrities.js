const express = require('express');
const router = express.Router();

const Celebrity = require('../models/celebrity');

router.get('/', async (req, res, next) => {
  try {
    const celebrity = await Celebrity.find();
    res.render('celebrities/index', { celebrity });
  } catch (error) {
    next(error);
  }
});

router.get('/:id/show', async (req, res, next) => {
  const { id } = req.params;
  try {
    const celebrityId = await Celebrity.findById(id);
    res.render('celebrities/show', celebrityId);
  } catch (error) {
    next(error);
  }
});

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

module.exports = router;
