

window.onload = ()=>{
    const btn = document.querySelector('#send');
    const login = document.querySelector('#login');
    const pass = document.querySelector('#pass');

    btn.onclick = function(e){
        e.preventDefault();
        const loginValue = login.value;
        const passValue = pass.value;

        const xhr = new XMLHttpRequest();
        const url = `${config.api}/auth/authenticate`;

        xhr.open("POST",url);
        xhr.setRequestHeader("Content-type", "application/json");

        xhr.onreadystatechange = function(){
            if(xhr.readyState==4){
                 const {freeze,msg,token} = JSON.parse(xhr.response);
                 if(freeze){
                    $("#send").attr("disabled", true);
                    alert("Blocked for 5 minutes");
                    setTimeout(function(){$("#send").attr("disabled", false);}, 1000*10);
                }else{
                    console.log(token);
                    if(token){
                        alert('Successfuly authenticated');
                        localStorage.token = token;
                        const origin = window.location.origin;
                        window.location.href = origin+'/directory.html';
                    }else{
                        alert(msg);
                    }
                }
            }
        }
        xhr.send(JSON.stringify({name:loginValue,password:passValue}));
    }    
}