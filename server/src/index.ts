const cors = require("cors");
import express, { Application, Request, Response } from "express";
const cookieparser = require('cookie-parser');
import userRouter from "./router/user.router";
import authRouter from "./router/auth.router";
import refreshRouter from "./router/refresh.router";
import dotenv from "dotenv";
import morgan from "morgan";

import {
  validateAccessToken,
  validateRefreshToken,
  validateToken,
} from "./utils/jwt";
import { NUMBER } from "sequelize";
// import testConnection from './database/models'
dotenv.config();
const app: Application = express();

app.use(express.json());
app.use(cors());

app.use(morgan('tiny'))
app.get(
  "/",
  (req: Request, res: Response): Response => res.json("server is healthy")
);
app.use("/auth", authRouter);
app.use(cookieparser());
app.use(validateRefreshToken);
app.use("/refresh", refreshRouter);
app.use(validateAccessToken);
app.use("/user", userRouter);

const PORT = process.env.PORT ?? 5433
app.listen(PORT, () => {
  console.log(`Server started at PORT ${PORT}`);
});

process.on('uncaughtException', err => {
  console.log(`Uncaught Exception: ${err.message}`)
  process.exit(1)
})
