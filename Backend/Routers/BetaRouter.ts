import express from "express";
const beta = express.Router();


beta.get("/",async  (req,res) => {
    return res.status(200).send("hello");
});

beta.post("/",async  (req,res) => {

    res.status(200).send("hello");
});
export default beta