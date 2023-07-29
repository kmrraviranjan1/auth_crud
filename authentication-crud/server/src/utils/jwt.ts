import { Request, Response, NextFunction } from "express";
import { ApiResponseInterface } from "../interfaces/apiResponse.interface";
import CustomRequestInteface from "../interfaces/customRequest.interface";
import { UserInterface } from "../interfaces/user.interface";
import { getUserByEmail } from "../service/user.service";
var jwt = require("jsonwebtoken");

const validateToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers["authorization"]?.split(" ")[1];
    const validatedToken = jwt.verify(token, process.env.JWT_SECRET);
    const user: UserInterface = await getUserByEmail(validatedToken.username);
    (req as CustomRequestInteface).user = user;
    next();
  } catch (error: any) {
    const result: ApiResponseInterface = {
      statusCode: 403,
      success: false,
      message: "JWT malinformed",
    };
    res.status(403).json(result);
  }
};

const validateAccessToken = async (
  req: CustomRequestInteface,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers['ssil-accesstoken'] || req.headers['SSIL-accessToken']
    const validatedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const user: UserInterface = await getUserByEmail(validatedToken.username);
    req.user = user;
    next();
  } catch (error: any) {
    const result: ApiResponseInterface = {
      statusCode: 403,
      success: false,
      message: "JWT malinformed",
    };
    res.status(403).json(result);
  }
};

const validateRefreshToken = async (
  req: CustomRequestInteface,
  res: Response,
  next: NextFunction
) => {
  try {
    const header = req.header
    const headers = req.headers
    const token = req.cookies['SSIL-refreshToken'];
    const validatedToken = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
    const user: UserInterface = await getUserByEmail(validatedToken.username);
    req.user = user;
    next();
  } catch (error: any) {
    const result: ApiResponseInterface = {
      statusCode: 403,
      success: false,
      message: "JWT malinformed",
    };
    res.status(403).json(result);
  }
};

const createToken = (payload: object): String => {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "2m",
  });
};

const createAccessToken = (payload: object): String => {
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "2m",
  });
};

const createRefreshToken = (payload: object): String => {
  return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "5m",
  });
};

export {
  createToken,
  createAccessToken,
  createRefreshToken,
  validateToken,
  validateAccessToken,
  validateRefreshToken,
};
