const mongoose = require("mongoose");

const FAQSchema = new mongoose.Schema({
  question: { type: String, required: true },
  answer: { type: String, required: true },
  translations: {
    te: { question: String, answer: String },
    hi: { question: String, answer: String },
    kn: { question: String, answer: String }
  },
});

module.exports = mongoose.model("FAQ", FAQSchema);
