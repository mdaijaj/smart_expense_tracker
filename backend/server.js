require("dotenv").config();
const express = require("express");
const cors = require("cors");
const apiRoute = require("./route/index");
const connectDB = require("./database/db");

const app = express();
app.use(express.json());
app.use(cors());

// Initialize database connection
connectDB();

app.use("/api", apiRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));