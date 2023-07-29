const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
import { Router, Request, Response } from "express";
import { createUser, getUserByEmail } from "../service/user.service";
import { ApiResponseInterface } from "../interfaces/apiResponse.interface";
import { UserInterface } from "../interfaces/user.interface";
import {
  createAccessToken,
  createRefreshToken,
  createToken,
} from "../utils/jwt";

const router = Router();

router.post(
  "/signin",
  async (req: Request, res: Response): Promise<Response> => {
    const { email, password } = req.body;
    const userRecord: UserInterface = await getUserByEmail(email);

    if (!userRecord) {
      const result: ApiResponseInterface = {
        statusCode: 401,
        success: false,
        message: "Bad Request",
      };
      return res.status(401).json(result);
    }

    const matchPassword = await bcrypt.compare(password, userRecord.password);

    if (!matchPassword) {
      const result: ApiResponseInterface = {
        statusCode: 403,
        success: false,
        message: "Invalid credentials",
      };

      return res.status(200).json(result);
    }

    const accessToken = createAccessToken({ username: userRecord.email, name: userRecord.name });
    const refreshToken = createRefreshToken({ username: userRecord.email });
    res.cookie("SSIL-refreshToken", refreshToken, {
      httpOnly: true,
      // secure: true, 
      maxAge: 60 * 60 * 1000
    });
    const result: ApiResponseInterface = {
      statusCode: 200,
      success: true,
      message: "user authenticated successfully",
      data: { accessToken },
    };

    return res.status(200).json(result);
  }
);

router.post(
  "/signup",
  async (req: Request, res: Response): Promise<Response> => {
    try {
      const rawUser: UserInterface = req.body;
      const hashedPassword = await bcrypt.hash(
        rawUser.password,
        Number(process.env.BYCRYPT_SALT)
      );
      rawUser.password = hashedPassword;
      const createdUser: UserInterface = await createUser(rawUser);
      const token = createToken({ username: createdUser.email, name: createdUser.name });
      const result: ApiResponseInterface = {
        statusCode: 201,
        success: true,
        message: "Create user success",
        data: { token },
      };
      return res.status(200).json(result)
    } catch (error: any) {
      const result: ApiResponseInterface = {
        statusCode: 500,
        success: false,
        message: "Create user Failure",
      };
      return res.status(200).json(result);
    }
  }
);

export default router;
