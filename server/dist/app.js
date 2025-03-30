"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const auth_routes_1 = require("./routes/auth.routes");
const httpStatus_1 = require("./constants/httpStatus");
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
app.use(express_1.default.json());
app.use((0, helmet_1.default)());
app.use((0, morgan_1.default)("dev"));
app.use("/api/auth", auth_routes_1.authRoutes);
app.use((req, res) => {
    res.status(httpStatus_1.HTTP_STATUS.NOT_FOUND).json({ error: "Route not found" });
});
app.use((err, req, res, next) => {
    console.error("Unhandled error:", err);
    res.status(err.status || httpStatus_1.HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
        error: err.message || "Internal Server Error",
    });
});
app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});
