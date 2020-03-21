const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const auth = require('../middleware/auth');

router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.send(user);
  } catch (err) {
    console.error(err.msg);
    res.status(500).send('Server Error');
  }
});

router.post(
  '/login',
  [
    check('email', 'Please enter a valid email').isEmail(),
    check('password', 'Please Enter valid password').isLength({ min: 6 })
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const { email, password } = req.body;

      // find if user already exist
      var user = await User.findOne({ email: email });

      if (!user) {
        user = new User({
          email,
          password
        });

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        await user.save();
        const payload = {
          user: {
            id: user.id
          }
        };
        const token = jwt.sign(payload, config.get('jwtSecret'), {
          expiresIn: 360000
        });

        return res.json(token);
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ errors: [{ msg: 'Invalid password' }] });
      }

      const payload = {
        user: {
          id: user.id
        }
      };
      const token = jwt.sign(payload, config.get('jwtSecret'), {
        expiresIn: 360000
      });

      res.json(token);
    } catch (err) {
      console.error(err.message);
      res.send(400).json({ msg: 'server error' });
    }
  }
);

module.exports = router;
