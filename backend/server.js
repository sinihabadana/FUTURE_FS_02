const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

// ROUTES
const leadRoutes = require("./routes/leadRoutes");
app.use("/api/leads", leadRoutes);

// DATABASE
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

// SERVER
app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});