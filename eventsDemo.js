import { EventEmitter } from "events";

const myEmitter = new EventEmitter();

function GreetHandler(name) {
  console.log("Hello World " + name);
}

function GoodByeHandler(name) {
  console.log("Good Bye " + name);
}



myEmitter.on("greet", GreetHandler);
myEmitter.on("goodBye", GoodByeHandler);

myEmitter.emit("greet", "abc");
myEmitter.emit("goodBye", "xyz");
