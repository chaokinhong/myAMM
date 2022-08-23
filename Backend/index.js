import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from './src/routes/user.js'
import preRoutes from './src/routes/pre.js'

const app = express()
dotenv.config()
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use('/user', userRoutes)
app.use('/pre',preRoutes)
app.get("/", (req, res) => {
    res.send("Hello to MangoDB Backend!!!!!");
});

const CONNECTION_URL = process.env.CONNECTION_URL;
const PORT = process.env.PORT || 5000

mongoose
  .connect(CONNECTION_URL)
  .then(() =>
    app.listen( 5000 ,() => console.log(`Server running on port: ${PORT}`))
  )
  .catch((error) => console.log(error.message));


