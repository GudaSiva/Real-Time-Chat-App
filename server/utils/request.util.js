"use strict";

const cleanEmptyFields = (data) => {
  for (const key in data) {
    if (data[key] === "") {
      delete data[key];
    }
  }
};

module.exports = { cleanEmptyFields };
