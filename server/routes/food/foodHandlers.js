"use strict";
const { MongoClient } = require("mongodb");
const { todayDate } = require("../todayDateHelper");
const { searchFoodByDate } = require("./foodHelpers");
const { uuid } = require("uuidv4");
require("dotenv").config();

const { MONGO_URI } = process.env;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const getFood = async (req, res) => {
  let { date, user } = req.body;

  try {
    if (date) {
      searchFoodByDate(res, date, user);
    } else {
      //Getting today's date and formatting it using this as the date if user doesn't pass any in the body
      const todayFormatted = todayDate();
      searchFoodByDate(res, todayFormatted, user);
    }
  } catch (err) {
    console.log(err);
  }
};

const addFood = async (req, res) => {
  let { name, calories, date, user } = req.body;

  if (!name) {
    res.status(400).json({ status: 400, message: "Missing name" });
  }

  if (!calories || calories < 0) {
    res.status(400).json({ status: 400, message: "Missing calories" });
  }

  if (!date) {
    date = todayDate();
  }

  const client = new MongoClient(MONGO_URI, options);
  await client.connect();
  try {
    const _id = uuid();
    const db = client.db();

    //If the item exists, update calories only or else create it (upsert)
    await db
      .collection("food")
      .updateOne(
        { name, date, user },
        { $inc: { calories: +calories }, $set: { _id, name, date, user } },
        { upsert: true }
      );

    res.status(201).json({
      status: 201,
      data: req.body,
      message: `${name} has been added`,
    });
  } catch (err) {
    res.status(500).json({ status: 500, message: "Unknown-Error" });
  }
  client.close();
};

const updateFood = async (req, res) => {
  let { _id, name, calories, date, user } = req.body;

  const client = new MongoClient(MONGO_URI, options);
  await client.connect();
  try {
    const db = client.db();
    const food = await db
      .collection("food")
      .updateOne({ _id }, { $set: { name, date, user, calories } });

    if (food.modifiedCount > 0) {
      res.status(201).json({
        status: 201,
        message: `${_id} has been modified`,
      });
    } else if (food.modifiedCount === 0 && food.matchedCount > 0) {
      res
        .status(400)
        .json({ status: 304, message: "Nothing has been modified" });
    } else {
      res
        .status(400)
        .json({ status: 400, message: "No items match your query" });
    }
  } catch (err) {
    res.status(500).json({ status: 500, message: "Unknown-Error" });
  }
  client.close();
};

const deleteFood = async (req, res) => {
  let { _id, user } = req.body;

  const client = new MongoClient(MONGO_URI, options);
  await client.connect();
  try {
    const db = client.db();
    const deleted = await db.collection("food").deleteOne({ _id, user });

    if (deleted.deletedCount > 0) {
      res.status(201).json({
        status: 201,
        message: `${_id} has been deleted`,
      });
    } else {
      res
        .status(400)
        .json({ status: 400, message: "Nothing has been deleted" });
    }
  } catch (err) {
    res.status(500).json({ status: 500, message: "Unknown-Error" });
  }
  client.close();
};

module.exports = { getFood, addFood, updateFood, deleteFood };
