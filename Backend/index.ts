import express from 'express';
import cors from 'cors';
import beta from "./Routers/BetaRouter";


const app = express();
const port = 8030;

app.use(cors());
app.use(express.json());
app.use('/beta',beta);


const run = async () => {
    app.listen(port, () => {
        console.log(`Server started on ${port} port!`);
    });
};
run().catch(console.error);