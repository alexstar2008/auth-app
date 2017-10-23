function getFiles(){
    httpService.get('/fs').then((data)=>{
        const files = data;
        const fileWrapper = $('#files-wrapper');
        files.forEach(function(name) {
            const file = templateFile(name);
            fileWrapper.append(file);
        });
        
    }).catch((err)=>{
        console.log(err);
    });
}
function getPermissions(fileName){
    httpService.get(`/fs/permissions/${fileName}`).then((data)=>{
        showModalPermissions(fileName,data);
    }).catch((err)=>{
        console.log(err);
    });
}
function getFileContent(fileName){
    httpService.get(`/fs/file/${fileName}`).then((data)=>{
        showModalContext(fileName,data);
    }).catch((err)=>{
        alert(`Error:${err}`);
    })
}
function postPermissions(fileName,permissions){
    const body = {
        file:fileName,
        permissions
    }
    httpService.post(`/fs/permissions`,body).then((data)=>{
        alert(data);
    }).catch((err)=>{
        alert(`Error:${err}`);
    })
}
function delFile(fileName){
    httpService.del(`/fs/file/${fileName}`).then((data)=>{
        alert('Success delete');
        location.reload();
    }).catch((err)=>{
        console.log(err);
    });
}
function updateFile(fileName,content){
    const body = {
        fileName,content
    };
    httpService.post('/fs/file',body).then((data)=>{
        alert('Success updated');
    }).catch((err)=>{
        console.log(err);
    });
}