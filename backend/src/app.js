const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const authRouters = require("./routes/authRoutes");
const usersRoutes = require("./routes/users");
const tradesRoutes = require("./routes/trades");
const traineesRoutes = require("./routes/trainees");
const modulesRoutes = require("./routes/modules");
const marksRoutes = require("./routes/marks");
require("./config/db");

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Welcome to hell ⛑️");
});

app.use("/api/", authRouters);
app.use("/api/users", usersRoutes);
app.use("/api/trades", tradesRoutes);
app.use("/api/trainees", traineesRoutes);
app.use("/api/modules", modulesRoutes);
app.use("/api/marks", marksRoutes);

app.listen(3004, () => {
  console.log(`Server running on port 3004`);
});
