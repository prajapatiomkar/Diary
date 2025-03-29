import express, { Express, NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";

dotenv.config();

const app: Express = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(helmet());
app.use(morgan("dev"));

app.get("/", (req: Request, res: Response, next: NextFunction) => {
  try {
    if (Math.floor(Math.random() * 10) % 2 === 0) {
      res.status(200).json({ message: "Hello World1!" });
      return;
    }
    res.status(200).json({ message: "Hello World2!" });
  } catch (error) {
    next(error);
  }
});

app.use((err: unknown, req: Request, res: Response, next: NextFunction) => {
  console.error("Unhandled error:", err);
  res.status(500).json({ error: "Internal Server Error" });
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
