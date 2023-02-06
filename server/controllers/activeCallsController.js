const activeCalls = require('./../models/activeCallsModel');


exports.getAllactiveCalls =async (req, res, next) => {
  try{
  const queryObj={...req.query};//gives extra fields
  const excludedFields=['page','sort','limit','fields'];
  excludedFields.forEach(el=>delete queryObj[el]);
  let quertyStr=JSON.stringify(queryObj)
  let query = activeCalls.find(JSON.parse(quertyStr));//if we directly await we cannot do things like limit and paging
  if(req.query.sort){
  query=query.sort(req.query.sort)//this sorts as price
  }
  const activecalls= await query;
  res.status(200).json({
    status: 'success',
    results: activecalls.length,
    data: {
      activecalls
    }
  });
}
catch(err){
res.status(404).json({
status:'fail',
message:err})
}};

exports.createactiveCall = async (req, res, next) => {
  try{
  const newactivecall = await activeCalls.create(req.body);
  res.status(201).json({
    status: 'success',
    data: {
      activecalls: newactivecall
    }
  });
}
catch(err){
res.status(404).json({
status:'fail',
message:err})
}
};

exports.deleteactiveCalls=async(req,res)=>{
try{
await activeCalls.findByIdAndDelete(req.params.id);
res.status(200).json({
status:'success',
data:null})
}

catch(err){
res.status(404).json({
status:'fail',
message:err})
}
}

exports.getactiveCall=async(req,res,next)=>{
try{
const activecall=await activeCalls.findById(req.params.id);
res.status(200).json({
status:'success',
results:activecall.length,
data:{
activecall
}
})
}
catch(err){
res.status(404).json({
status:'fail',
message: err
})
}
}