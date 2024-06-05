const express = require("express");
const router = express.Router();
const Student = require("../models/student");

router.get("/", async (req, res) => {
  try {
    let data = await Student.find({}).exec();
    return res.send(data);
  } catch (e) {
    return res.status(500).send("獲取學生資料失敗");
  }
});

router.get("/:_id", async (req, res) => {
  try {
    let { _id } = req.params;
    let data = await Student.findOne({ _id }).exec();
    return res.send(data);
  } catch (e) {
    return res.status(400).send(e);
  }
});

router.post("/", async (req, res) => {
  try {
    let { name, age, merit, other } = req.body;
    let newStudent = new Student({
      name,
      age,
      scholarship: {
        merit,
        other,
      },
    });

    let data = await newStudent.save();
    return res.send({
      msg: "成功新增學生資料",
      saveObject: data,
    });
  } catch (e) {
    return res.status(500).send("新增學生資料失敗");
  }
});

router.put("/:_id", async (req, res) => {
  try {
    let { _id } = req.params;
    let { name, age, merit, other } = req.body;
    let data = await Student.findOneAndReplace(
      { _id },
      {
        name,
        age,
        scholarship: {
          merit,
          other,
        },
      },
      { new: true, runValidators: true }
    );

    return res.send({ msg: "更新資料成功", updatedData: data });
  } catch (e) {
    return res.status(400).send(e);
  }
});

router.patch("/:_id", async (req, res) => {
  try {
    let { _id } = req.params;
    let { name, age, merit, other } = req.body;
    let data = await Student.findByIdAndUpdate(
      { _id },
      {
        name,
        age,
        "scholarship.merit": merit,
        "scholarship.other": other,
      },
      { new: true, runValidators: true }
    );
    console.log(data);
    return res.send({ msg: "更新資料成功", updatedData: data });
  } catch (e) {
    return res.status(400).send(e);
  }
});

router.delete("/:_id", async (req, res) => {
  try {
    let { _id } = req.params;
    let deleteData = await Student.deleteOne({ _id });

    return res.send(deleteData);
  } catch (e) {
    return res.status(400).send("無法刪除資訊");
  }
});

module.exports = router;
