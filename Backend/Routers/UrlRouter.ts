import express from "express";
import Url from "../Models/Url";
import {UrlMutation} from "../types";
const UrlRouter = express.Router();



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
    const urlMutation:UrlMutation = {
        link:req.body.link
    }

    if (!urlMutation) {
        return res.status(400).send({ error: 'Link is required' });
    }

    const url = new Url(urlMutation )

    try {
        await url.save();
        return res.status(201).send(url);
    } catch (error) {
        return res.status(500).send({ error: 'Error saving URL' });
    }
});

export default UrlRouter