"use strict";
const { MongoClient } = require("mongodb");
require("dotenv").config();

const { MONGO_URI } = process.env;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const getCalories = async (req, res) => {
  let { date, user } = req.body;

  try {
  } catch (err) {
    console.log(err);
  }
};
