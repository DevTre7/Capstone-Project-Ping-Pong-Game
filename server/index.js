const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv").config();

const{seed, addPoints, getsScore} = require("./controller")


const app = express();
app.use(cors());
app.use(express.json());

//first endpoint
app.get("/", (req, res) => {
  res.send("hello");
});

app.post("/", seed);

app.post("/addpoints", addPoints);

app.get("/getpoints", getsScore);

app.listen(4000, () => {
  console.log("Listening on http://localhost:4000");
});
