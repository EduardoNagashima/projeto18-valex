import express from "express";
import dotenv from "dotenv";
import router from "./routes/index.js";
dotenv.config();

const app = express();

app.use(router);

app.listen(+process.env.PORT || 5000, ()=>{
    console.log('Rodando na porta', 4000);
});