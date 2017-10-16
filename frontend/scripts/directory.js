const httpService = http();

// handlers
function openPermission(target){
    const fileName = target.dataset.fileName;
    getPermissions(fileName);
}
function savePermissions(target){
    const permissions = { };
    const fileName = $("#permission-content").data('fileName');
    $("#permission-content tr").each(function(index,row){
        const user = row.cells[0].innerHTML;
        let perms = ''
        $(`input[name="${user}"]:checked`).each(function() {
            perms+=$(this).val();
         });
        permissions[user] = perms;
    });
    postPermissions(fileName,permissions);
}
function saveFile(target){
    const fileName = $(".modal-title").html();
    const content = $(".modal-body textarea").val();
    updateFile(fileName,content);
}
function openFile(target){
    const fileName = target.dataset.fileName;
    getFileContent(fileName);   
}
function deleteFile(target){
    const fileName = target.dataset.fileName;
    delFile(fileName);
}
// view change
function changeBackColor(element){
    $(element).toggleClass('file-selected');
}
function showModalContext(fileName,content){
    $(".modal-title").text(fileName);
    $(".modal-body textarea").val(content);
    $("#file-content").modal('show');
}
function showModalPermissions(fileName,permissions){
    const template = templatePermissions(permissions);
    $("#permission-content").data('fileName',fileName);
    $("#permission-content").append(template);
    $("#file-permissions").modal('show');
}

window.onload = function(){
    getFiles();
}