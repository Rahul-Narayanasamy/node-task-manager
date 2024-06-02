const express = require("express");
const tasksRoutes = require("./routes/tasks");
const connectDB = require("./db/connect");
const notFound = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");
const app = express();
require("dotenv").config();

app.use(express.static("./public"));
app.use(express.json());

app.use("/api/v1/tasks", tasksRoutes);

app.use(notFound);
app.use(errorHandlerMiddleware);

const PORT = process.env.PORT || 5001;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(PORT, console.log(`Server is listening on Port ${PORT}...`));
  } catch (error) {
    console.log(error);
  }
};

start();
