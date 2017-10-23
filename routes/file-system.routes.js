const router = require('express').Router();

const fileSystemController = require('../controllers/file-system.controller')();

router.get('/',(req,res,next)=>{
    fileSystemController.getDirectoryFiles().then((data)=>{
        res.status(200).send(data);
    }).catch((err)=>{
        console.log(err);
        res.status(500).send(`Error:${err}`);
    });
});
// File operations
router.get('/file/:name',(req,res,next)=>{
    const {role,name} = req.token;
    const fileName  = req.params.name;

    fileSystemController.getFile(role,fileName,name).then((data)=>{
        res.status(200).send(data);
    }).catch(({err,code=500})=>{
        console.log(code);
        res.status(code).send(`Error:${err}`);
    });
});
router.delete('/file/:name',(req,res,next)=>{
    const {role,name} = req.token;
    const fileName = req.params.name;
    fileSystemController.removeFile(role,fileName,name).then((msg)=>{
        res.status(200).send(msg);
    }).catch(({err,code=500})=>{
        res.status(code).send(`Error:${err}`);
    });
});
router.post('/file',(req,res,next)=>{
    const {role,name} = req.token;
    const {fileName,content} = req.body;

    fileSystemController.updateFile(role,fileName,content,name).then((msg)=>{
        res.status(200).send(msg);
    }).catch(({err,code=500})=>{
        res.status(code).send(`Error:${err}`);
    });
}); 
// Permissions
router.get('/permissions/:name',(req,res,next)=>{
    const {role} = req.token;
    const fileName = req.params.name;

    fileSystemController.getFilePermissions(role,fileName).then((data)=>{
        res.status(200).send(data);
    }).catch(({err,code=500})=>{
        res.status(code).send(`Error:${err}`);
    });
});
router.post('/permissions',(req,res,next)=>{
    const {role,name} = req.token;

    const {file,permissions} = req.body;
    
    fileSystemController.setFilePermissions(role,file,permissions,name).then((msg)=>{
        res.status(200).send(msg);
    }).catch(({err,code=500})=>{
        res.status(code).send(`Error:${err}`);
    });
});

module.exports = router;