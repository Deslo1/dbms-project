const activeCalls = require('./../models/activeCallsModel');


exports.getAllactiveCalls =async (req, res, next) => {
  const activecalls = await activeCalls.find();
  // SEND RESPONSE
  res.status(200).json({
    status: 'success',
    results: activecalls.length,
    data: {
      activecalls
    }
  });
};


exports.createactiveCall = async (req, res, next) => {
  const newactivecall = await activeCalls.create(req.body);
  res.status(201).json({
    status: 'success',
    data: {
      activecalls: newactivecall
    }
  });
};