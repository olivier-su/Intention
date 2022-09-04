"use strict";
const { MongoClient } = require("mongodb");
const { todayDate } = require("../todayDateHelper");
const { uuid } = require("uuidv4");
require("dotenv").config();

const { MONGO_URI } = process.env;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const getTask = async (req, res) => {
  let { date, user } = req.body;

  try {
    const client = new MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db();
    const result = await db.collection("task").find({ date, user }).toArray();
    if (result) {
      res.status(200).json({ status: 200, result });
    } else {
      res.status(400).json({
        status: 400,
        message: "Couldn't find any tasks logged that day.",
      });
    }
    client.close();
  } catch (err) {
    console.log(err);
  }
};

// A lot of the checks are done in the frontend, can add more checks in the backend later
const addTask = async (req, res) => {
  let { task, date, user } = req.body;

  if (!task) {
    res.status(400).json({ status: 400, message: "Missing task" });
  }

  if (!date) {
    date = todayDate();
  }
  try {
    const client = new MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db();
    const _id = uuid();
    const result = await db
      .collection("task")
      .insertOne({ _id, date, user, task });

    res.status(200).json({ status: 200, result });

    client.close();
  } catch (err) {
    console.log(err);
  }
};

//A lot of the checks are made in the frontend, will add more checks in the backend when I have time later
const deleteTask = async (req, res) => {
  let { _id } = req.body;
  const client = new MongoClient(MONGO_URI, options);
  await client.connect();
  try {
    const db = client.db();
    await db.collection("task").deleteOne({ _id });

    res.status(200).json({ status: 200, message: "The task has been deleted" });
    client.close();
  } catch (err) {
    console.log(err);
  }
};

module.exports = { getTask, addTask, deleteTask };
