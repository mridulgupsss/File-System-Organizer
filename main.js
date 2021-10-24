#!/usr/bin/env node

// taking input
/*process.argv[2]  is a inbuilt array here where inputs of commmand line are stored 
on 1st idx "node" on 2nd idx "name of file" and from there we can add more inputs */
let inputArr = process.argv.slice(2)  // taking input from command line



let helpObj = require("./commands_implemented/help");
let organizeObj = require("./commands_implemented/organize");


/*
Commands to Implement 
1. node name.js organize "directoryPath"
2. node name.js help 
*/

let command = inputArr[0];

switch (command) {
  case "help":
    helpObj.helpKey(); //calling tree function in tree.js in commands folder 
    break;
  case "organize":
    organizeObj.organizeKey(inputArr[1]); //calling organize function in organize.js in commands folder 
    break;

    default:
      console.log(`This Command is not implemented
  Make use of "help" command to know more`);
      break;




}










