import express from "express";
import viewEngine from "./config/viewEngine";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth";
import configCors from "./config/cors";
import { configPassport } from "./controllers/passportController";
import configSession from "./config/session"

require("dotenv").config();
const app = express();
const port = process.env.PORT_AUTH || 8081;
configCors(app);
// app.use(cors());
app.use(cors({ origin: true, credentials: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
configSession(app);

viewEngine(app);
authRoutes(app);

app.use((req, res) => {
  return res.send("404 not found");
});

configPassport();

app.listen(port, () => {
  console.log(`Auth service listening on port ${port}`);
});
