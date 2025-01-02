
let username;

username = window.prompt("What's your username");

console.log(username);


//Above is the easy way.

//now for the professional way in the html file.

document.getElementById("mySubmit").onclick = function() {

    username2 = document.getElementById("myText").value;
    document.getElementById("myH1").textContent = `hello ${username2}`

}