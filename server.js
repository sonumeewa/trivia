const express = require('express');
const config = require('config');
const connectDB = require('./config/db');
const userRouter = require('./api/routes/user');
const gameRouter = require('./api/routes/game');
const cors = require('cors');
const app = express();

var corsOptions = {
  origin: '*',
  responseHeader:
    'Origin, X-Requested-With, Content-Type, Accept, Authorization',
  method: 'POST, GET, PUT,PATCH, DELETE, OPTIONS',
  maxAgeSeconds: 120
};

app.use(cors(corsOptions));
app.use(express.json({ extended: false }));
connectDB();

app.use('/api/user', userRouter);
app.use('/api/game', gameRouter);

const port = config.PORT || 5000;
app.listen(port, () => {
  console.log('Server connected at:', port);
});
