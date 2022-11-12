fetch("/all-user",{
    method:"GET"
}).then((response) => response.json())
// .then((data) => console.log(data));
.then(res=>{
    if(res.ok){
        location.reload();
    } else {
        alert("trumpet sound")
    }
})


