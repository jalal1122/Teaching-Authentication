import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.route.js";

// import cors from 'cors';

// initialize express app
const app = express();

// middlewares such as cors and json parsing
// app.use(cors(
//     {
//         origin: process.env.ORIGIN
//     }
// ));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(bodyParser.json());

app.use("/api/user", userRouter);

export default app;
