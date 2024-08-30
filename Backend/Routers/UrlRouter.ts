import express from "express";
import Url from "../Models/Url";
import {UrlMutation} from "../types";
const UrlRouter = express.Router();

const createRandomShortLinkId = (maxLength = 6) => {
    const createRandomWords = ['Q','W','E','R','T','Y','U','I','O','P','a','s','d','f','g','g','h','j','k','l','Z','X','C','V','B','N','m'];
    let randomWord = '';
    for(let i = 0; i < maxLength; i++) {
        const randomIndex = Math.floor(Math.random() * createRandomWords.length);
        randomWord += createRandomWords[randomIndex];
    }
    console.log(randomWord)
    return randomWord
};




UrlRouter.get("/", async (req, res, next) => {
    try {
        const urls = await Url.find();
        return res.status(200).send(urls);
    } catch (error) {
        console.error('Error finding URLs:', error);
        next(error);
    }
});

UrlRouter.post("/", async (req, res) => {
    let shortLink = '';
    let onlyShortId = false;

    const checkOnlyShortId = async () => {
        while (!onlyShortId) {
            shortLink = createRandomShortLinkId();
            const ShortLinkId = await Url.findOne({ shortLink });
            if (!ShortLinkId) {
                onlyShortId = true;
            }
        }
        console.log("it is checking",shortLink)
        return shortLink;
    }

    try {
    const urlMutation:UrlMutation = {
        link:req.body.link,
        shortLink: await checkOnlyShortId(),
    }

    if (!urlMutation) {
        return res.status(400).send({ error: 'Link is required' });
    }

        const url = new Url(urlMutation )
        await url.save();
        return res.status(201).send(url);

    } catch (error) {
        return res.status(500).send({ error: 'Error saving URL' });
    }
});

export default UrlRouter