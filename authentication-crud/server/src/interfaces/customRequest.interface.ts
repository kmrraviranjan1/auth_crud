import { Request } from "express";
import { UserInterface } from "./user.interface";

interface CustomRequestInteface extends Request {
  user?: UserInterface;
}

export default CustomRequestInteface
