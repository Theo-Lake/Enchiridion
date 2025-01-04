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

//type conversion below:

let age = window.prompt("How old are you?");
age+=1;

console.log(age);

//this converts a string into a number, since you can do arithmetic calculations with it

//when strings/nums are converted to boolean they are always true, except when it is an empty string/num

const PI = 3.14159;

//cont is a constant variable that cant be changed
