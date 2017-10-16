function http(){
    const get = (url)=>{
        return new Promise((resolve,reject)=>{
            const xhr = new XMLHttpRequest();
            xhr.open("GET",config.api + url);
            xhr.setRequestHeader("Authorization",`Bearer ${localStorage.token}`);
            xhr.setRequestHeader("Content-type", "application/json");
            xhr.onreadystatechange = function(){
                if(xhr.readyState==4){
                    let response = null;
                    
                    const contentType = xhr.getResponseHeader("content-type");
                    if(contentType && contentType.indexOf("application/json") !== -1) {
                        response = JSON.parse(xhr.response);
                    }else
                        response = xhr.response;
                    
                    if(xhr.status===200){
                        resolve(response)
                    }else{

                        alert(response);
                    }
                }
            }
            xhr.send();
        })
    }

    const post = (url,body={})=>{
        return new Promise((resolve,reject)=>{
            const xhr = new XMLHttpRequest();
            xhr.open("POST",config.api + url);
            xhr.setRequestHeader("Authorization",`Bearer ${localStorage.token}`);
            xhr.setRequestHeader("Content-type", "application/json");
            xhr.onreadystatechange = function(){
                if(xhr.readyState==4){
                    const response = xhr.response;
                    if(xhr.status===200){
                        resolve(response);
                    }else{
                        alert(response);
                    }
                }
            }
            xhr.send(JSON.stringify(body));
        });
    }

    const del = (url,body)=>{
        return new Promise((resolve,reject)=>{
            const xhr = new XMLHttpRequest();
            xhr.open("DELETE",config.api + url);
            xhr.setRequestHeader("Authorization",`Bearer ${localStorage.token}`);
            xhr.setRequestHeader("Content-type", "application/json");
            xhr.onreadystatechange = function(){
                if(xhr.readyState==4){
                    const response = xhr.response;
                    if(xhr.status===200){
                        resolve(response);
                    }else{
                        alert(response);
                    }
                }
            }
            xhr.send(JSON.stringify(body));
        });
    }
    
    return {
        get,
        post,
        del
    }
}