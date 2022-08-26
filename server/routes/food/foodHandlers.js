"use strict";
const { MongoClient } = require("mongodb");
const { searchFoodByDate } = require("./foodHelpers");
require("dotenv").config();

const { MONGO_URI } = process.env;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const getFood = async (req, res) => {
  const bodyDate = req.body.date;

  try {
    if (bodyDate) {
      searchFoodByDate(res, bodyDate);
    } else {
      //Getting today's date and formatting it using this as the date if user doesn't pass any in the body
      const today = new Date();
      const todayFormatted = today.toLocaleDateString(undefined, {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      });
      searchFoodByDate(res, todayFormatted);
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = { getFood };
