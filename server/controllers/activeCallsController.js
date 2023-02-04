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

exports.updateactiveCall= async(req,res)=>{
try{
const tour=await activeCalls.findByIdAndUpdate(req.params.id,req.body,{
new:true,//return modified document
runValidators:true//runs update validation against model' schema
})
res.status(200).json({
status:'success',
data:{
tour//same as tour:tour
}
})
}
catch(err){
res.status(404).json({
status:'fail',
message: err
})
}}