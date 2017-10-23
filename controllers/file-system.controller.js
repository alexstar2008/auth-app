const fs = require('fs');
const path = require('path');

const FILE_DIR = path.join(__dirname,`../file-system/`);
const dacChecker = require('./security/dac-table');

const logger = require('../winston');

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
    const getFile = (name,fileName,userName)=>{
        console.log("name:"+name);
           return new Promise((resolve,reject)=>{
            if(dacChecker.isReadAllowed(name,fileName)){
                fs.readFile(FILE_DIR+fileName,"utf8",(err,data)=>{
                    if(err){
                        reject(`Err:${err}`);
                    }
                    logger.info(`user(${userName})-read file(${fileName})-success`);
                    resolve(data);
                });
            }else{
                logger.error(`user(${userName})-read file(${fileName})-no acess`);
                reject({err:'No access',code:401});
            }
        });
    }
    const updateFile = (user,fileName,content='',userName)=>{
        return new Promise((resolve,reject)=>{
            if(dacChecker.isWriteAllowed(user,fileName)){
                fs.writeFile(FILE_DIR+fileName,content,"utf8",(err)=>{
                    if(err){
                        reject(`Err:${err}`);
                    }
                    logger.info(`user(${userName})-update file(${fileName})-success`);
                    resolve('Updated');
                });
            }else{
                logger.error(`user(${userName})-update file(${fileName})-no acess`);
                reject({err:'No access',code:401});
            }
        });
    }
    const removeFile = (name,fileName,userName)=>{
        return new Promise((resolve,reject)=>{
            if(dacChecker.isDeleteAllowed(name,fileName)){
                fs.unlink(FILE_DIR+fileName,(err)=>{
                    if(err){
                        reject(`Err:${err}`);
                    }
                    logger.info(`user(${userName})-remove file(${fileName})-success`);
                    resolve("Successfully deleted");
                })
            }else{
                logger.error(`user(${userName})-remove file(${fileName})-no acess`);
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
    const setFilePermissions = (name,file,permissions,userName)=>{
        return new Promise((resolve,reject)=>{   
            if(dacChecker.isOwner(name,file)){
                dacChecker.setFilePermissions(file,permissions);
                resolve('Permissions were successfuly updated');
                logger.info(`user(${userName})-update file permissions(${file})-success`);
            }else{ 
                logger.error(`user(${userName})-update file permissions(${file})-failed`);            
                reject({err:'No root to change permissions',code:401}); 
            }
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