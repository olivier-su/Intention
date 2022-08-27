"use strict";
const todayDate = () => {
  const today = new Date();
  return today.toLocaleDateString(undefined, {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
};

module.exports = { todayDate };
