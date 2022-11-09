const loginForm = document.querySelector("#login");
loginForm.addEventListener("submit",e=>{
    e.preventDefault();
    console.log('PREVENTED DEFAULT!')
    const userObj = {
        email:document.querySelector("#loginEmail").value,
        password:document.querySelector("#loginPassword").value,
    }
    fetch("/users/login",{
        method:"POST",
        body:JSON.stringify(userObj),
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

const signupForm = document.querySelector("#signup");
signupForm.addEventListener("submit",e=>{
    e.preventDefault();
    console.log('PREVENTED DEFAULT!')
    const userObj = {
        email:document.querySelector("#signupEmail").value,
        name:document.querySelector("#signupName").value,
        password:document.querySelector("#signupPassword").value,
        group_name:document.querySelector("#groupName").value,
        group_star_goal_num:document.querySelector("#groupStarNum").value,
        group_goal_award:document.querySelector("#groupAward").value,
        group_picture:'https://morisky78.github.io/Portfolio/assets/images/temp/pic_all.jpg'
    }
    fetch("/users/",{
        method:"POST",
        body:JSON.stringify(userObj),
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