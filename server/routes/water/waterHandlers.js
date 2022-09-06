"use strict";
const { MongoClient } = require("mongodb");
const { uuid } = require("uuidv4");
require("dotenv").config();

const { MONGO_URI } = process.env;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const getWater = async (req, res) => {
  let { date, user } = req.body;

  try {
    const client = new MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db();
    const result = await db.collection("water").find({ date, user }).toArray();
    if (result) {
      res.status(200).json({ status: 200, result });
    } else {
      res.status(400).json({
        status: 400,
        message: "Couldn't find any water logged that day.",
      });
    }
    client.close();
  } catch (err) {
    console.log(err);
  }
};
const updateWater = async (req, res) => {
  let { quantity, user, date } = req.body;

  const client = new MongoClient(MONGO_URI, options);
  await client.connect();
  try {
    const db = client.db();

    const searchWater = await db
      .collection("water")
      .find({ date, user })
      .toArray();

    if (searchWater.length > 0) {
      await db
        .collection("water")
        .updateOne({ date, user }, { $set: { quantity } });
      res.status(201).json({
        status: 201,
        data: req.body,
        message: `${date} has been modified`,
      });
    } else {
      const _id = uuid();
      await db.collection("water").insertOne({ _id, date, quantity, user });
      res.status(201).json({
        status: 201,
        data: req.body,
        message: `${date} has been added`,
      });
    }
  } catch (err) {
    res.status(500).json({ status: 500, message: err });
  }
  client.close();
};

module.exports = { getWater, updateWater };
