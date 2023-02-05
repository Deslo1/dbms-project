const express = require('express');
const activeCallsController = require('./../controllers/activeCallsController');

const router = express.Router();

router
  .route('')
  .get(activeCallsController.getAllactiveCalls)
  .post(activeCallsController.createactiveCall)

router
  .route('/:id')
  .delete(activeCallsController.deleteactiveCalls);

module.exports = router;
