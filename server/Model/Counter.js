const mongoose = require("mongoose");

const CounterSchema = new mongoose.Schema({
    name: String,
    postNum: Number
},
    { collection: "counter" });

const Counter = mongoose.model("Counter", CounterSchema);

module.exports = { Counter };