import express from "express";
import viewEngine from "./config/viewEngine";
import cors from "cors";
import bodyParser from "body-parser";
import initUserRoutes from "./routes/userAPI";
import cookieParser from "cookie-parser";
require("dotenv").config();
const app = express();
const port = process.env.PORT_USER_REQUEST || 8082;
app.use(cors({ credentials: true, origin: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());
initUserRoutes(app);
viewEngine(app);

app.use((req, res) => {
  return res.send("404 not found");
});
app.listen(port, () => {
  console.log(`user service listening on port ${port}`);
});
