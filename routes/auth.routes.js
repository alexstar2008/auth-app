const router = require('express').Router();

const authController = require('../controllers/auth.controller')();

router.get('/',(req,res)=>{
    res.send('Welcome to our auth app');
});
router.get('/users',(req,res)=>{
    authController.getUsers().then((data)=>{
        res.send(data);
    }).catch((err)=>{
        res.status(500).send(err);
    });
});
router.post('/authenticate',(req,res)=>{
    const {name,password} = req.body;
    authController.authUser(name,password).then((data)=>{
        res.send(data);
    }).catch(({code=500,msg,freeze})=>{
        res.status(code).send({msg,freeze});
    });;
});

router.get('/setup',(req,res)=>{
    const {user,pass,role} = req.query;
   authController.registerUser(user,pass,role).then((data)=>{
       res.send(data);
   }).catch((err)=>{
       res.status(500).send(err);
   });
});

module.exports = router;