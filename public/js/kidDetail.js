const iDidItButtons = document.querySelectorAll(".iDidItBtn");

iDidItButtons.forEach(didItBtn=>{
    didItBtn.addEventListener("click",e=>{
        const taskId = e.target.getAttribute("data-taskId")
        const kidId = document.querySelector("#kid-info").getAttribute("data-kidId");
        
        const starObj = {
            kid_id:kidId,
            task_category_id:taskId
        }
        console.log(starObj);
        fetch("/stars/",{
            method:"POST",
            body:JSON.stringify(starObj),
            headers:{
                "Content-Type":"application/json"
            }
        }).then(res=>{
            if(res.ok){
               location.reload()
            } else {
                alert("trumpet sound -- i did it button")
            }
        })
    })
})