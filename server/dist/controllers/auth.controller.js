"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = void 0;
const httpStatus_1 = require("../constants/httpStatus");
const register = (req, res, next) => {
    try {
        res.status(httpStatus_1.HTTP_STATUS.CREATED).json({ message: "User registered" });
    }
    catch (error) {
        next(error);
    }
};
exports.register = register;
