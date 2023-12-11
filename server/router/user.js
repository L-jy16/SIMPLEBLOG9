const express = require("express");
const router = express.Router();

// 스키마 만들기
const { User } = require("../Model/User.js");
const { Counter } = require("../Model/Counter.js");

router.post("/join", (req, res) => {
    let temp = req.body;

    Counter.findOne({ name: "counter" })
        .then((result) => {
            temp.userNum = result.userNum;

            const userDate = new User(temp);
            userDate
                .save()
                .then(() => {
                    Counter.updateOne({ name: "counter" }, { $inc: { userNum: 1 } })
                        .then(() => {
                            res.status(200).json({ success: true })
                        })
                })
        })
        .catch((err) => {
            console.log(err)
            res.status(400).json({ success: false });
        })
})

module.exports = router;