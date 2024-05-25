const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { generateAddress } = require("./Generator");
const dotenv = require("dotenv").config();

const UsersSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  dateTime: {
    type: Date,
    default: Date.now,
  },
  ltcAddress: {
    type: String,
    default: function () {
      const ltcAddress = generateAddress(
        this.email + process.env.SPECIAL_KEY
      )[0];
      return ltcAddress;
    },
  },
  btcAddress: {
    type: String,
    default: function () {
      const btcAddress = generateAddress(
        this.email + process.env.SPECIAL_KEY
      )[1];
      return btcAddress;
    },
  },
});

// Hash the password before saving it to the database
UsersSchema.pre("save", async function (next) {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
    next();
  } catch (error) {
    next(error);
  }
});

const UserModel = mongoose.model("register", UsersSchema);
module.exports = UserModel;
