let x;
//defining a variable

x = 100; 
//initializing a variable

let y = 100;
//still works

console.log(y); //prints out in console

//number data types can be of all numbers, including floats, longs etc

let msg = "stoopid";

//same for strings and chars

console.log(`You are ${msg}`);

//${} = "%x" or +   + 

//use `` instead of "" to interpolate variables

let test = "Look at this 999";

//strings CAN include numbers and spaces, however cant be used for math

console.log(test);

//boolean

let online = false;
online = true;

console.log(typeof online);

console.log(`Programming is cool: ${online}`);

document.getElementById("myH1").textContent = "look at this";
document.getElementById("myP").textContent = `you are ${msg}`;




