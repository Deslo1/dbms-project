const express = require('express');
const activeCallsRouter = require('./routes/activeCallsRouter');
const userRouter = require('./routes/userRouter');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

app.use('/', activeCallsRouter);
app.use('/login',userRouter);

module.exports = app;
