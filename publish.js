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

app.get("/publish", async (req, res) => {
  const id = Math.floor(Math.random) * 10;
  const data = {
    id,
    message: `message : ${id}`,
  };
  await publisher.publish("message", JSON.stringify(data));
  res.send({
    message: "data published",
  });
});

app.listen(3001, () => {
  console.log("Listening in published");
});
