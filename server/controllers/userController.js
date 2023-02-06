const jwt = require('jsonwebtoken');
const User = require('./../models/userModel');


const signToken = id => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });
};

exports.signup = async (req, res, next) => {
const newUser = await User.create({
name: req.body.name,
password: req.body.password
 });

const token = signToken(newUser._id);

res.status(201).json({
status: 'success',
token,
data:
{
user:newUser}
})
};


exports.login =async (req, res, next) => {
try{
const { name, password } = req.body;

 if (!name || !password) {
 res.status(401).json({
    status:'fail',
    message:'User does not exist'
 })
 }

 const user = await User.findOne({name}).select('+password');

 if (!user || !(await user.correctPassword(password, user.password))) {
 res.status(401).json({
    status:'fail',
    message:'Incorrect Password or Username'
 }) }

 if(name==='dispatch'){
 res.status(201).json({
 page: 'dispatch',
 user
 });
 }

 else{
 res.status(201).json({
 page: 'squad',
 user
 });
 }
}
catch(err){
    console.log(err);
}
}