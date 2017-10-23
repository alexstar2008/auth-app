const router = require('express').Router();
const jwt = require('jsonwebtoken');

const config = require('../config');
const authRouter = require('./auth.routes');
const fileSystemRouter = require('./file-system.routes');

router.use('/auth',authRouter);
router.use((req,res,next)=>{
   
    let rawToken = '';
    if(req.headers.authorization){
        rawToken =  req.headers.authorization.split(' ');
     
    }else{
        rawToken = req.body.token || req.query.token || req.headers['x-access-token'];
    }
    let token = null;
    if(rawToken && rawToken.length == 2){
        const schema = rawToken[0];
        const credentials = rawToken[1];
        token = credentials;
    }else{
        token = rawToken;
    }
  
    if(token){
        jwt.verify(token,config.secret,(err,decoded)=>{
            if(err){
                res.send({success:false,msg:"Failed to auth token"})
            }else{
                req.token = decoded;
                next();
            }
        });
    }else{
        return res.status(403).send({success:false,msg:"No token provided"});
    }
});
router.use('/fs',fileSystemRouter);

module.exports = router;