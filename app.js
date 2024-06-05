const express = require("express");
const app = express();
const mongoose = require("mongoose");
const studentRoutes = require("./routes/student-routes");
const cors = require("cors");

connectDB();
async function connectDB() {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/exampleDB");
    console.log("連接資料庫成功");
  } catch (e) {
    console.log("連接資料庫失敗");
    console.log(e);
  }
}

app.set("View engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/students", studentRoutes);

app.listen(8080, () => {
  console.log("伺服器正在聆聽...");
});
