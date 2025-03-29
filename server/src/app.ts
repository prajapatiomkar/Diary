import express, { Express, NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import { authRoutes } from "./routes/auth.routes";
import { HTTP_STATUS } from "./constants/httpStatus";

dotenv.config();

const app: Express = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(helmet());
app.use(morgan("dev"));

app.use("/api/auth", authRoutes);

app.use((req: Request, res: Response) => {
  res.status(HTTP_STATUS.NOT_FOUND).json({ error: "Route not found" });
});

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error("Unhandled error:", err);
  res.status(err.status || HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
    error: err.message || "Internal Server Error",
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
