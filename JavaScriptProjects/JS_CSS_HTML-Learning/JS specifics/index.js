//tenary operator:
//shortcut for if and else statements

//normal way:

let age = 21;

if(age >= 18) {

    message = "You're an adult";

} else {

    message = "You're a minor";

}

//tenary way:

let message = age >= 18 ? "You're an adult" : "You're a minor";
console.log(message);
//let message is used because the string must be assigned a variable,
// which in turn will be message.
 
//works with boolean values etc