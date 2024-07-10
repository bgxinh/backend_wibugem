import express from "express";
import viewEngine from "./config/viewEngine";
import cors from "cors";
import bodyParser from "body-parser";
import initAdminRoutes from "./routes/admin";
import { connectDB } from "./config/connectDB";
import { connectToMongoDB } from "./config/connectMGDB";
import cookieParser from "cookie-parser";
import { configPassport } from "./controllers/passportController";
import configSession from "./config/session"

require("dotenv").config();
const app = express();
const port = process.env.PORT || 8080;

app.use(cors({ credentials: true, origin: true }));
connectDB();
connectToMongoDB();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

configSession(app);


initAdminRoutes(app);
viewEngine(app);



app.use((req, res) => {
  return res.send("404 not found server");
});

configPassport();

app.listen(port, () => {
  console.log(`Server istening on port ${port}`);
});
