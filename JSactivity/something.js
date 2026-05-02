function login(){
    var username = (document.getElementById("user_name")).value
    var password = (document.getElementById("password")).value


    if (username === "JAVASCRIPT" && password === "java1234"){
        alert("Log in Succesfull")
    } else if (username ==="JAVASCRIPT" || password !== "java1224"){
        alert("Incorrect password")
    } else if (username !== "JAVASCRIPT" || password === "java1234"){
        alert("Incorrect username")
    } else {
       alert("Invalid Username and Password.")
    }


    
}