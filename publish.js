const express = require("express");
const redis = require("redis");

const app = express();

let publisher = redis.createClient({
  url: "redis://localHost:6379",
});

publisher.on("error", (err) => console.log("redis error"));
publisher.on("connect", (err) => console.log("redis connected"));

const connect = async () => {
  await publisher.connect();
};

connect();

app.get("/", (req, res) => {
  res.send({
    status: true,
    message: "Getting successful",
  });
});

app.get("/publish", (req, res) => {
  res.send({
    status: true,
    message: "redis published",
  });
});

app.listen(3001, () => {
  console.log("Listening in published");
});
