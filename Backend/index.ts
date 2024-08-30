import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import UrlRouter from "./Routers/UrlRouter";
import multer from 'multer';

const upload = multer();
const app = express();
const port = 8033;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(upload.none());
app.use(cors());

app.use('/url',UrlRouter);


const run = async () => {
    await mongoose.connect('mongodb://localhost/url');
    app.listen(port, () => {
        console.log(`Server started on ${port} port!`);
    });
    process.on('exit', () => {
        mongoose.disconnect();
    });
};
run().catch(console.error);