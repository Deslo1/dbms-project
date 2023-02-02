const express = require('express');
const activeCallsController = require('./../controllers/activeCallsController');

const router = express.Router();

router
  .route('')
  .get(activeCallsController.getAllactiveCalls)
  .post(activeCallsController.createactiveCall);

module.exports = router;
