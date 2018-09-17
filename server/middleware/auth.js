const {User} =require('./../models/user');


let Auth = (req,res,next) =>{
 let token = req.cookies.auth;
 User.findByToken(token,(err,user)=>{
   if (err) throw err;
   if(!user) return res.json({
     error:true
   })
   req.user = user;
   req.token =token;
   next();
 })
}

module.exports = {Auth};
