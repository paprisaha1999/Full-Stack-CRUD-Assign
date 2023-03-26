const express = require("express");
const { connection } = require("./db");
const { userRouter } = require("./routes/user.routes");
const { noteRouter } = require("./routes/note.routes");
const { auth } = require("./middleware/auth.middleware");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(cors());
app.use("/users", userRouter);
app.use(auth); // middleware: for checking authorization of notes routes
app.use("/notes", noteRouter);

app.listen(process.env.port, async () => {
  try {
    await connection;
    console.log("connected to mongoDB");
  } catch (err) {
    console.log("not able to connect to mongo");
    console.log(err);
  }
  console.log(`server is running on port ${process.env.port}`);
});
