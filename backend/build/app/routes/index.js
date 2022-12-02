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
const user_routes_1 = __importDefault(require("./api/users/user.routes"));
const admin_routes_1 = __importDefault(require("./api/users/admin.routes"));
const ValidateToken_middleware_1 = __importStar(require("../middleware/ValidateToken.middleware"));
const Query_middleware_1 = __importDefault(require("../middleware/Query.middleware"));
const admin_request_1 = __importDefault(require("../requests/user/admin.request"));
const admin_controller_1 = __importDefault(require("../controller/user/admin.controller"));
const router = (0, express_1.Router)();
const requests = new admin_request_1.default();
const controller = new admin_controller_1.default();
router.use("/user", user_routes_1.default);
router.post("/admin/login", (0, Query_middleware_1.default)(requests.login), controller.login);
router.use("/admin", ValidateToken_middleware_1.default, (0, ValidateToken_middleware_1.isValied)("admin"), admin_routes_1.default);
exports.default = router;
