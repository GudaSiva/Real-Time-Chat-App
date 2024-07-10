"use strict";
const bcrypt = require("bcrypt");
const { hash } = require("../constants/global.constant");

exports.generateHash = (str) => bcrypt.hash(str, hash.ENCRYPTION_SALT);
exports.compareString = (str, hash) => bcrypt.compare(str, hash);
