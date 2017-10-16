const dacMatrix = {
    "admin":{
        'public.txt':'rwdo',
        'admin.txt':'rwdo',
        'read-only.txt':'rwdo',
        'read-write-only.txt':'rwdo',
        'work-group.txt':'rwdo',
        'home-group.txt':'rwdo',
        'user.txt':'rwdo',
        'user-prime.txt':'rwdo',
        'user-not-delete.txt':'rwdo',
        'haos.txt':'rwdo',
    },
    "user":{
        'public.txt':'rwd',
        'admin.txt':'',
        'read-only.txt':'r',
        'read-write-only.txt':'rw',
        'work-group.txt':'',
        'home-group.txt':'',
        'user.txt':'rwdo',
        'user-prime.txt':'rwd',
        'user-not-delete.txt':'rw',
        'haos.txt':'rwdo',
    },
    "home-group":{
        'public.txt':'rwd',
        'admin.txt':'',
        'read-only.txt':'r',
        'read-write-only.txt':'rw',
        'work-group.txt':'',
        'home-group.txt':'rwdo',
        'user.txt':'',
        'user-prime.txt':'rw',
        'user-not-delete.txt':'r',
        'haos.txt':'rwdo',
    },
    "work-group":{
        'public.txt':'rwd',
        'admin.txt':'',
        'read-only.txt':'r',
        'read-write-only.txt':'rw',
        'work-group.txt':'rwdo',
        'home-group.txt':'',
        'user.txt':'',
        'user-prime.txt':'rw',
        'user-not-delete.txt':'r',
        'haos.txt':'rwdo',
    },
};

// Permission check
const getPermission = (user,file)=>{
    return dacMatrix[user][file];
}
const setPermission = (user,file,permission)=>{
    dacMatrix[user][file]  = permission;
}

// All permissions
const getFilePermissions = (user, file)=>{
    const permissions = {};
    for(let key in dacMatrix){
        if(key === user)
            continue;
        permissions[key] = getPermission(key,file) || '';
    }
    return permissions;
}
const setFilePermissions = (file,permissions)=>{
    for(let user in dacMatrix){
        const permission = permissions[user];
        setPermission(user,file,permission);
    }
    console.log(dacMatrix);
}

// concretized permissions
const isOwner = (user,file) =>{
    return getPermission(user,file).includes('o');
}
const isReadAllowed = (user,file)=>{
    return getPermission(user,file).includes('r');
}
const isWriteAllowed = (user,file)=>{
    return getPermission(user,file).includes('w');
}
const isDeleteAllowed = (user,file)=>{
    return getPermission(user,file).includes('d');
}

module.exports = { 
    setPermission,
    isReadAllowed,
    isWriteAllowed,
    isDeleteAllowed,
    getFilePermissions,
    setFilePermissions
};