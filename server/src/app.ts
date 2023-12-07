import express from "express";
import { configDotenv } from "dotenv";
import morgan from "morgan";
import cors from "cors";

import router from "./routes/index.js";
import cookieParser from "cookie-parser";

configDotenv();

const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET_KEY));
app.use(morgan("dev"));

//routes
app.use("/api/v1", router);

export default app;
