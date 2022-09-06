"use strict";

const express = require("express");
const morgan = require("morgan");

const PORT = 4000;

const app = express();

app.use(function (req, res, next) {
  res.header(
    "Access-Control-Allow-Methods",
    "OPTIONS, HEAD, GET, PUT, POST, DELETE"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.use(morgan("tiny"));
app.use(express.static("./server/assets"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Routes
app.use(require("./routes/food/food"));
app.use(require("./routes/exercise/exercise"));
app.use(require("./routes/spending/spending"));
app.use(require("./routes/task/task"));
app.use(require("./routes/water/water"));

app.use("/", express.static(__dirname + "/"));

app.listen(PORT, () => console.info(`Listening on port ${PORT}`));
