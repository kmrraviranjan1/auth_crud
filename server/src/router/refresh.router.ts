import { Router, Request, Response } from "express";
import {
  createAccessToken,
  createRefreshToken,
  createToken,
} from "../utils/jwt";
import { ApiResponseInterface } from "../interfaces/apiResponse.interface";
import CustomRequestInteface from "../interfaces/customRequest.interface";

const router = Router();

router.get(
  "/",
  async (req: CustomRequestInteface, res: Response): Promise<Response> => {
    const user = req.user;
    const accessToken = createAccessToken({ username: user?.email });
    const refreshToken = createRefreshToken({ username: user?.email });
    res.cookie("SSIL-refreshToken", refreshToken, {
      httpOnly: true,
    //   secure: true,
      maxAge: 60 * 60 * 1000,
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

export default router;
