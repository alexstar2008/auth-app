const templateFile = function(name){
    return `
        <div class="col-xs-12 col-md-2 col-lg-2">
        <div class="file" onmouseover="changeBackColor(this)" ondblclick="openFile(this)" data-file-name="${name}">
            <div class="file-view">
                <img src="./imgs/file.png" />
            </div>
            <div class="file-name">
                ${name}
            </div>
        </div>
        <div class="file-btn-wrapper">
            <div class="file-delete"  onclick="deleteFile(this)" data-file-name="${name}">
                Delete
            </div>
            <div class="file-permissions"  onclick="openPermission(this)" data-file-name="${name}">
                Permissions
            </div>
        </div>
    </div>
    `;
}
const templatePermissions = function(permissions){
    let template = '';
    for(let key in permissions){
        const name = `<td>${key}</td>`;
        const userPerms =  permissions[key];
        const userPermsRendered = `
            <td><input type="checkbox"  name="${key}" value="r" ${userPerms.includes('r')?'checked':''}></td>
            <td><input type="checkbox"  name="${key}" value="w" ${userPerms.includes('w')?'checked':''}></td>
            <td><input type="checkbox"  name="${key}" value="d" ${userPerms.includes('d')?'checked':''}></td>
            <td><input type="checkbox"  name="${key}" value="o" ${userPerms.includes('o')?'checked':''}></td>
        `;
        template+='<tr>'+name+userPermsRendered+'</tr>';
    }
    return template;
}