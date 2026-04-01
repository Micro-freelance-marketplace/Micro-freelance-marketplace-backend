import express from "express";
import helmet from 'helmet';
import cors from 'cors';

const app = express();

app.use(helmet());
app.use(cors(
    {
        origin: '*', //we can add routes here at the production time
        optionsSuccessStatus: 200
        
    }
))

app.use(express.json());

app.get("/health", (req, res) => res.send("Server is running"));

export default app;