const express = require('express');
const config = require('config');
const connectDB = require('./config/db');
const userRouter = require('./api/routes/user');
const gameRouter = require('./api/routes/game');
const app = express();

app.use(express.json({ extended: false }));
connectDB();

app.use('/api/user', userRouter);
app.use('/api/game', gameRouter);

const port = config.PORT || 5000;
app.listen(port, () => {
  console.log('Server connected at:', port);
});
