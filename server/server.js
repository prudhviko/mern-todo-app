const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const PORT = process.env.PORT || 5000;
dotenv.config();

const userRoutes = require("./routes/userRoutes");
const todoRoutes = require("./routes/todoRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/todos", todoRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
