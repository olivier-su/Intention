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
    const db = client.db();

    const searchFood = await db
      .collection("food")
      .find({ date, user, name })
      .toArray();

    //If the food is already in the database, update food collection and calories collection
    if (searchFood.length > 0) {
      await db
        .collection("food")
        .updateOne({ name, date, user }, { $inc: { calories: +calories } });
      await db
        .collection("calories")
        .updateOne({ date, user }, { $inc: { calories: +calories } });
      res.status(201).json({
        status: 201,
        data: req.body,
        message: `${name} has been modified`,
      });
    }
    // Else you add the food to the food collection and you create or increase the calories collection
    else {
      const _id = uuid();
      await db
        .collection("food")
        .insertOne({ _id, date, name, user, calories });
      await db
        .collection("calories")
        .updateOne(
          { date, user },
          { $inc: { calories: +calories }, $set: { date, user } },
          { upsert: true }
        );
      res.status(201).json({
        status: 201,
        data: req.body,
        message: `${name} has been added`,
      });
    }
  } catch (err) {
    res.status(500).json({ status: 500, message: err });
  }
  client.close();
};

const updateFood = async (req, res) => {
  let { _id, name, calories, user, date } = req.body;

  const client = new MongoClient(MONGO_URI, options);
  await client.connect();
  try {
    const db = client.db();

    //This part checks if the modification was adding or removing calories
    const foodCopy = await db.collection("food").find({ _id }).toArray();
    const oldCalories = foodCopy[0].calories;
    const caloriesDifferential = calories - oldCalories;

    const food = await db
      .collection("food")
      .updateOne({ _id }, { $set: { name, calories } });

    if (food.modifiedCount > 0) {
      await db
        .collection("calories")
        .updateOne(
          { user, date },
          { $inc: { calories: +caloriesDifferential } }
        );
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
  let { _id, user, date } = req.body;

  const client = new MongoClient(MONGO_URI, options);
  await client.connect();
  try {
    const db = client.db();
    const food = await db.collection("food").find({ _id }).toArray();
    const calories = food[0].calories;
    const deleted = await db.collection("food").deleteOne({ _id });

    if (deleted.deletedCount > 0) {
      await db
        .collection("calories")
        .updateOne({ user, date }, { $inc: { calories: -calories } });
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
    res.status(500).json({ status: 500, message: err });
  }
};

module.exports = { getFood, addFood, updateFood, deleteFood };
