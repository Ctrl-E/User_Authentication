const dotenv = require("dotenv");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const UserModel = require("./models/Users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

const app = express();

dotenv.config();
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173", process.env.SERVER_ADDRESS],
    methods: ["GET", "POST"],
    credentials: true,
  })
);
app.use(cookieParser());

// Database connection
mongoose.connect(process.env.DB_URI);
const db = mongoose.connection;
db.once("open", () => {
  console.log("Connected to MongoDB successfully");
});

db.on("error", (error) => {
  console.error("Error connecting to MongoDB:", error);
});

//User Verification Middleware
const verifyUser = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    res.status(401).json({ message: "Unauthorized Access" });
  } else {
    jwt.verify(token, process.env.KEY, (err, decoded) => {
      if (err) {
        res.status(401).json({ message: "Invalid Token" });
      } else {
        req.decoded = decoded;
        next();
      }
    });
  }
};

//Home Page
app.get("/", verifyUser, (req, res) => {
  const decodedData = req.decoded;
  res.json({ message: "Success", decodedData });
});

// Register a user
app.post("/register", async (req, res) => {
  const { email, name, password } = req.body;
  if (email && name && password) {
    try {
      let user = await UserModel.findOne({ email: email });
      if (user) {
        res.status(400).json({ error: "User Already Registered" });
      } else {
        UserModel.create(req.body)
          .then(() => res.json("Success"))
          .catch((err) => res.json(err));
      }
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    res.status(400).json({ error: "Fields cannot be empty" });
  }
});

// Login User
app.post("/login", (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
  UserModel.findOne({ email: email }).then((user) => {
    if (user) {
      bcrypt.compare(password, user.password, (err, result) => {
        if (err) {
          // Handle error
          res.status(500).json("Internal Server Error");
        } else if (result) {
          // Passwords match, user is authenticated
          console.log("User Found Authenticated");
          const token = jwt.sign({ email: user.email }, process.env.KEY, {
            expiresIn: "1d",
          });
          res.cookie("token", token);
          res.json("Success");
        } else {
          // Passwords don't match
          res.json("Incorrect Password");
        }
      });
    } else {
      res.json("Email Not Registered");
    }
  });
});

// Fetch users crypto addresses from db
app.get("/crypto", async (req, res) => {
  try {
    const user = req.query.user;
    let data = await UserModel.findOne({ email: user });
    res.json([data.ltcAddress, data.btcAddress]);
    // Process the request with the user data
  } catch (error) {
    res.status(500).json({ error: "Invalid Request : User data not found" });
  }
});

app.listen(process.env.PORT, () => {
  console.log("Server started");
});
