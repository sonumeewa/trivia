const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  score: {
    type: Number,
    default: 0
  },
  games: {
    date: {
      type: Date,
      default: Date.now()
    },
    score: {
      type: Number,
      default: 0
    }
  }
});

module.exports = User = mongoose.model('User', UserSchema);
