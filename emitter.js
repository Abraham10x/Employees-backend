const events = require("events");
const logEvents = require("./logEvents");

const Emitter = new events();

Emitter.on("logs", (msg) => {
  logEvents(msg);
});

setTimeout(() => {
  Emitter.emit("logs", "Log event emitted!");
}, 2000);
