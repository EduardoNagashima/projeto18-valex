import express, {json} from "express";
import "express-async-errors";
import dotenv from "dotenv";
import router from "./routes/index.js";
import errorHandler from "./middlewares/errorHandler.js";
dotenv.config();

const app = express();

app.use(json())
app.use(router);
app.use(errorHandler);

const port = +process.env.PORT || 5000
app.listen(port, ()=>{
    console.log('Rodando na porta', port);
});