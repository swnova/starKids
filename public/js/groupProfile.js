const createTaskForm = document.querySelector("#createTask");
createTaskForm.addEventListener("submit", e=>{
    e.preventDefault();
    console.log('Task create!');

    const taskObj = {
        task:document.querySelector("#taskName").value,
    }
    console.log(taskObj);
    fetch("/tasks/",{
        method:"POST",
        body:JSON.stringify(taskObj),
        headers:{
            "Content-Type":"application/json"
        }
    }).then(res=>{
        if(res.ok){
           location.reload()
        } else {
            alert("trumpet sound")
        }
    })
})

const delButtons = document.querySelectorAll(".delBtn");
delButtons.forEach(delBtn=>{
    delBtn.addEventListener("click",e=>{
        const taskId = e.target.getAttribute("data-taskId")
        console.log(taskId);
        fetch(`/tasks/${taskId}`,{
            method:"DELETE"
        }).then(res=>{
            if(res.ok){
                location.reload();
            } else {
                alert("trumpet sound")
            }
        })
    })
})