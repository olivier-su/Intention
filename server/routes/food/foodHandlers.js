"use strict";
const { MongoClient } = require("mongodb");
const { todayDate } = require("../todayDateHelper");
const { searchFoodByDate } = require("./foodHelpers");
require("dotenv").config();

const { MONGO_URI } = process.env;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const getFood = async (req, res) => {
  const date = req.body.date;

  try {
    if (date) {
      searchFoodByDate(res, date);
    } else {
      //Getting today's date and formatting it using this as the date if user doesn't pass any in the body
      const todayFormatted = todayDate();
      searchFoodByDate(res, todayFormatted);
    }
  } catch (err) {
    console.log(err);
  }
};

const addFood = async (req, res) => {
  let { name, calories, image, date } = req.body;

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

    const food = await db.collection("food").findOne({ name });

    console.log(food);

    if (food) {
    }
    /* 
    //modify item stock
    const modifyResult = await db
      .collection("items")
      .updateOne({ _id: itemId }, { $inc: { numInStock: -amount } });
    if (!(modifyResult.matchedCount && modifyResult.modifiedCount)) {
      return res.status(400).json({ status: 400, message: "Modify-Failure" });
    }
    //get cart item that has this itemId
    //add or increase amount with upsert
    const { _id, numInStock, ...restInfo } = item;
    const modifyItemResult = await db
      .collection("cart")
      .updateOne(
        { itemId },
        { $inc: { amount }, $set: { itemId, ...restInfo } },
        { upsert: true }
      );
    res.status(201).json({
      status: 201,
      data: req.body,
      message: `${itemId} has been added`,
    }); */
  } catch (err) {
    res.status(500).json({ status: 500, message: "Unknown-Error" });
  }
  client.close();
};

module.exports = { getFood, addFood };
