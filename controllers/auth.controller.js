const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const config = require('../config');
const User = require('../models/user');
const logger = require('../winston');

const failedAccessCounter = {
    date:0,
    attempts:0,
    freezeLogin(){
        const currentDate = new Date().getTime();
        if(!this.date){
            this.date = currentDate;
            return false;
        }
        if(currentDate-this.date<1000*60 && this.attempts>5){
            this.attempts=0;
            this.date = currentDate;
            return true;
        }
        this.attempts++;
        if(currentDate-this.date>1000*60)
            this.date = currentDate;
        return false;
    }
}

const authController = function(){
    const getUsers = ()=>{
        return new Promise((resolve,reject)=>{
            User.find({},(err,users)=>{
                if(err)
                    reject(err);
                resolve(users);
            });
        });
    }
    const authUser = (name,pass)=>{
        return new Promise((resolve,reject)=>{
            User.findOne({name},(err,user)=>{
                if(err){
                    reject({msg:'Error of connection to database'});
                }
                if(!user){
                    logger.error(`user(${name})-auth failed-no user`);
                    reject({code:401,msg:'Authenticaiton failed. No such user'});
                }else{
                    const hashedPass = crypto.createHmac('sha256','cybernetics').update(pass).digest('hex');
                    if(hashedPass==user.password){
                        const token = jwt.sign(
                            {name:user.name,password:user.password,role:user.role},
                            config.secret,
                            {expiresIn:1000*60*60*224}
                        );
                        logger.info(`user(${name})-auth-success`);
                        resolve({
                            msg:'Successfully authenticated',
                            token
                        });
                    }
                    else{   
                        let freeze = false;
                        if(failedAccessCounter.freezeLogin())
                            freeze = true;
                        logger.error(`user(${name})-auth failed-incorrect password`);
                        reject({
                            code:401,
                            freeze,
                            msg:'Authentication failed. No such password',
                        });
                    }
                }
            });
        });
    }
    // test only
    const registerUser = (name,pass,role)=>{
      return new Promise((resolve,reject)=>{
            const secret = 'cybernetics';
            const rarePassword = pass;
            const password = crypto.createHmac('sha256',secret).
                update(rarePassword).digest('hex');
            const user = new User({
                name,
                password,
                role
            });
            user.save((err)=>{
                if(err)
                    reject(err);
                else{
                    resolve({success:true});
                }
            });    
      });
    };
    return{
        getUsers,
        authUser,
        registerUser
    }
}

module.exports = authController;