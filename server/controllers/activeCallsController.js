const activeCalls = require('./../models/activeCallsModel');


exports.getAllactiveCalls =async (req, res, next) => {
  const queryObj={...req.query};//gives extra fields
  const query = activeCalls.find(queryObj);//if we directly await we cannot do things like limit and paging
  const activecalls= await query;
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