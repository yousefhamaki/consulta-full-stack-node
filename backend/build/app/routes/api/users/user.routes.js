"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_request_1 = __importDefault(require("../../../requests/user/user.request"));
const user_controller_1 = __importDefault(require("../../../controller/user/user.controller"));
const Query_middleware_1 = __importDefault(require("../../../middleware/Query.middleware"));
const ValidateToken_middleware_1 = __importStar(require("../../../middleware/ValidateToken.middleware"));
const router = (0, express_1.Router)();
const controller = new user_controller_1.default();
const requests = new user_request_1.default();
router.post("/login", (0, Query_middleware_1.default)(requests.login), controller.login);
router.post("/add", (0, Query_middleware_1.default)(requests.add), controller.create);
router.put("/change/pass", ValidateToken_middleware_1.default, (0, ValidateToken_middleware_1.isValied)("user"), (0, Query_middleware_1.default)(requests.changePass), controller.changePass);
router.post("/verify/request", ValidateToken_middleware_1.default, (0, ValidateToken_middleware_1.isValied)("user"), (0, Query_middleware_1.default)(requests.verify), controller.verifyRequest);
router.get("/verify/response/:code/:email", controller.verifyResponse);
router.post("/all", ValidateToken_middleware_1.default, (0, ValidateToken_middleware_1.isValied)("admin"), controller.getUsers);
router.delete("/delete/:id", ValidateToken_middleware_1.default, (0, ValidateToken_middleware_1.isValied)("admin"), controller.delete);
router.get("/getinfo/:id", controller.getUserInfo);
exports.default = router;
