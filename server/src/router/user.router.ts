import { Router, Request, Response } from "express";
import { getAllUser, getUserById, updateUser } from "../service/user.service";
import { ApiResponseInterface } from "../interfaces/apiResponse.interface";
import { UserInterface } from "../interfaces/user.interface";
import CustomRequestInteface from "../interfaces/customRequest.interface";
const router = Router();

router.get(
  "/",
  async (req: CustomRequestInteface, res: Response): Promise<Response> => {
    const tokenUser = req.user;
    const allUsers: UserInterface[] = await getAllUser();

    const result: ApiResponseInterface = {
      statusCode: 200,
      success: true,
      message: "users record found",
      data: allUsers,
    };

    return res.json(result);
  }
);

router.get("/:id", async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params;

  const user: UserInterface = await getUserById(id);

  const result: ApiResponseInterface = {
    statusCode: 200,
    success: true,
    message: "user record found",
    data: user,
  };

  return res.json(result);
});

router.put("/:id", async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params;
  const rawUser: UserInterface = req.body;
  try {
    const isUserUpdated: Boolean = await updateUser(rawUser, id);

    if (isUserUpdated) {
      const updatedUser: UserInterface = await getUserById(id);

      const result: ApiResponseInterface = {
        statusCode: 201,
        success: true,
        message: "User update request successfull",
        data: updatedUser,
      };

      return res.json(result);
    }

    const result: ApiResponseInterface = {
      statusCode: 400,
      success: false,
      message: "User update request failed",
    };

    return res.json(result);
  } catch (error) {
    const result: ApiResponseInterface = {
      statusCode: 500,
      success: false,
      message: "User update request failed",
      data: {},
    };

    return res.json(result);
  }
});

export default router;
