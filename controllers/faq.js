const FAQ = require("../models/faq");
// const { redisClient } = require("../util/redis");
const axios = require("axios");

const GOOGLE_TRANSLATE_API = "https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=";

exports.addFAQ = async (req, res, next) => {
  try {
    const { question, answer } = req.body;

    if (!question || !answer) {
        return res.status(400).json({ message: "Enter both question and answer" });
    }

    // Auto-translate to Hindi, Telugu and Kannada
    const [ques_hi, ques_te, ques_kn, ans_hi, ans_te, ans_kn] = await Promise.all([
      axios.get(`${GOOGLE_TRANSLATE_API}hi&dt=t&q=${encodeURIComponent(question)}`),
      axios.get(`${GOOGLE_TRANSLATE_API}te&dt=t&q=${encodeURIComponent(question)}`),
      axios.get(`${GOOGLE_TRANSLATE_API}kn&dt=t&q=${encodeURIComponent(question)}`),
      axios.get(`${GOOGLE_TRANSLATE_API}hi&dt=t&q=${encodeURIComponent(answer)}`),
      axios.get(`${GOOGLE_TRANSLATE_API}te&dt=t&q=${encodeURIComponent(answer)}`),
      axios.get(`${GOOGLE_TRANSLATE_API}kn&dt=t&q=${encodeURIComponent(answer)}`),
    ]);

    const faq = new FAQ({
      question,
      answer,
      translations: {
        en: { question, answer },
        hi: { question: ques_hi.data[0][0][0], answer: ans_hi.data[0][0][0] },
        kn: { question: ques_kn.data[0][0][0], answer: ans_kn.data[0][0][0] },
        te: { question: ques_te.data[0][0][0], answer: ans_te.data[0][0][0] }
      }
    });

    await faq.save();
    console.log("Post request received and reponse sent.");
    
    res.status(201).json({ "message": "FAQ added successfully", faq });
  } catch (err) {
    console.log(err, "Error adding FAQ");
    
    res.status(500).json({ "message": "Error adding FAQ",  });
  }
};

exports.getFAQs = async (req, res, next) => {
    try {
        const lang = req.query.lang || "en";
      
        // Check Redis Cache
        // const cachedFAQs = await redisClient.get(`faqs:${lang}`);
        // if (cachedFAQs) return res.json(JSON.parse(cachedFAQs));
      
        const faqs = await FAQ.find({}, `translations.${lang}`);
        // redisClient.setex(`faqs:${lang}`, 3600, JSON.stringify(faqs)); // Cache for 1 hour
        console.log(faqs);
        
        res.json(faqs);
        
    } catch (err) {
        console.error(err,"Problem getting data");
        res.status(500).json({ "message": "Something went wrong", "reason": err });
    }
};
