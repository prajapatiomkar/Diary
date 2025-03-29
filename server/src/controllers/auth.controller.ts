import { NextFunction, Request, Response } from "express";
import { HTTP_STATUS } from "../constants/httpStatus";

export const register = (req: Request, res: Response, next: NextFunction) => {
  try {
    res.status(HTTP_STATUS.CREATED).json({ message: "User registered" });
  } catch (error) {
    next(error);
  }
};
