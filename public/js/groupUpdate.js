const signupForm = document.querySelector("#group-update-form");
signupForm.addEventListener("submit",e=>{
    e.preventDefault();
    console.log('PREVENTED DEFAULT!')
    const userObj = {
        group_name:document.querySelector("#groupName").value,
        group_star_goal_num:document.querySelector("#groupStarNum").value,
        group_goal_award:document.querySelector("#groupAward").value,
        group_picture:document.querySelector("#picture-preview").src
    }
    fetch("/users/",{
        method:"PUT",
        body:JSON.stringify(userObj),
        headers:{
            "Content-Type":"application/json"
        }
    }).then(res=>{
        if(res.ok){
            document.location.replace(`/group-profile`);
        } else {
            alert("Group Update Error!")
        }
    })
})