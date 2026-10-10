// buscar data de usuario
(async ()=>{
   try{
    const token = localStorage.getItem('token');
    if(token == undefined || token == "")
    {
        console.error("token vazio ou não existente");
        return;
    }
    // console.log("token",token);
    // return;

    const response = await fetch("/api/deashboard/me",{
        method:"post",
        headers:{
            "Content-Type": "application/json",
            "Authorization":"Baarer "+token,
        }
    })
    const data = await response.json()
    console.log(data)
    
    if(!response.ok || data.status !== "success"){
        alert("erro ao buscar dados ");
        window.location.href = "/";
        return;

    }
    const user = data.user;

    //defindo icon user
    document.querySelector(".cont-user p").innerHTML = user.name;
    document.querySelector(".cont-user div p").innerHTML = user.name[0];

   }catch(err){
    console.log("não deu certo ");
   }
})()