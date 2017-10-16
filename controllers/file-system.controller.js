const fs = require('fs');
const path = require('path');

const FILE_DIR = path.join(__dirname,`../file-system/`);
const dacChecker = require('./security/dac-table');


const fileSystemController = function(){
    const getDirectoryFiles = ()=>{
        return new Promise((resolve,reject)=>{
            fs.readdir(FILE_DIR,(err,files)=>{
                if(err){
                    reject(err);
                }
                resolve(files);
            });
        });
    };
// File
    const getFile = (name,fileName)=>{
        return new Promise((resolve,reject)=>{
            console.log(`Name:${name}||fileName:${fileName}`);
            if(dacChecker.isReadAllowed(name,fileName)){
                fs.readFile(FILE_DIR+fileName,"utf8",(err,data)=>{
                    if(err){
                        reject(`Err:${err}`);
                    }
                    resolve(data);
                });
            }else{
                reject({err:'No access',code:401});
            }
        });
    }
    const updateFile = (user,fileName,content='')=>{
        return new Promise((resolve,reject)=>{
            if(dacChecker.isWriteAllowed(user,fileName)){
                fs.writeFile(FILE_DIR+fileName,content,"utf8",(err)=>{
                    if(err){
                        reject(`Err:${err}`);
                    }
                    resolve('Updated');
                });
            }else{
                reject({err:'No access',code:401});
            }
        });
    }
    const removeFile = (name,fileName)=>{
        return new Promise((resolve,reject)=>{
            if(dacChecker.isDeleteAllowed(name,fileName)){
                fs.unlink(FILE_DIR+fileName,(err)=>{
                    if(err){
                        reject(`Err:${err}`);
                    }
                    resolve("Successfully deleted");
                })
            }else{
                reject({err:'No access',code:401}); 
            }
        });
    }
// Permissions
    const getFilePermissions = (name,fileName)=>{
        return new Promise((resolve,reject)=>{
            const permissions = dacChecker.getFilePermissions(name,fileName);
            if(permissions){
                resolve(permissions);
            }else{
                reject('no permissions');
            }
        });
    }
    const setFilePermissions = (file,permissions)=>{
        return new Promise((resolve,reject)=>{
            dacChecker.setFilePermissions(file,permissions);
            resolve('Done');
        });
    }

    return{
        getDirectoryFiles,
        getFilePermissions,
        setFilePermissions,
        getFile,
        updateFile,
        removeFile,
    }

}

module.exports = fileSystemController;