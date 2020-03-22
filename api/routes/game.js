const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const request = require('request');
const auth = require('../middleware/auth');

router.get('/new', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');

    const options = {
      uri: `https://opentdb.com/api.php?amount=5`,
      method: 'GET',
      headers: { 'user-agent': 'node.js' }
    };

    request(options, (error, response, body) => {
      if (error) console.error(error);

      if (response.statusCode !== 200) {
        console.log(response.body);
        return res.status(400).json({ msg: 'No Questions found' });
      }
      res.json(JSON.parse(body));
    });
  } catch (err) {
    console.error(err.msg);
    res.status(500).send('Server Error');
  }
});

router.post('/score', auth, async (req, res) => {
  const user = await User.findById(req.user.id).select('-password');
  const { score } = req.body;
  const game = {
    date: Date.now(),
    score: score
  };
  user.games.unshift(game);
  await user.save();
  res.status(200).json({ msg: 'game saved' });
});

router.post('/list', auth, async (req, res) => {
  const user = await User.findById(req.user.id).select('-password');
  res.status(200).json({ success: true, games: user.games });
});

router.post('/delete', auth, async (req, res) => {
  const user = await User.findById(req.user.id).select('-password');
  const game = {
    date: Date.now(),
    score: score
  };
  user.games.unshift(game);
  await user.save();
  res.status(200).json({ msg: 'game saved' });
});
module.exports = router;
