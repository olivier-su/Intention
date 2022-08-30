"use strict";
const { MongoClient } = require("mongodb");
require("dotenv").config();

const { MONGO_URI } = process.env;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const searchFoodByDate = async (res, date, user) => {
  const client = new MongoClient(MONGO_URI, options);
  await client.connect();
  const db = client.db();
  const result = await db.collection("food").find({ date, user }).toArray();
  if (result) {
    res.status(200).json({ status: 200, result });
  } else {
    res.status(400).json({
      status: 400,
      message: "Couldn't find any food logged that day.",
    });
  }
  client.close();
};

module.exports = { searchFoodByDate };
