const router = require('express').Router();
const jwt = require('jsonwebtoken');

const config = require('../config');
const authRouter = require('./auth.routes');
const fileSystemRouter = require('./file-system.routes');

router.use('/auth',authRouter);
router.use((req,res,next)=>{
    const rawToken = req.body.token || req.query.token || req.headers['x-access-token'] || req.headers.authorization.split(' ');

    let token = null;
    if(rawToken.length == 2){
        const schema = rawToken[0];
        const credentials = rawToken[1];
        if(/^Bearer$/i.test(schema)){
            token = credentials;
        }else{
            res.send({success:false,msg:"Failed to auth token"})
        }
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