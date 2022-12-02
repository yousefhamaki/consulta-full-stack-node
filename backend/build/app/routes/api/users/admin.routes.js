"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Query_middleware_1 = __importDefault(require("../../../middleware/Query.middleware"));
const admin_controller_1 = __importDefault(require("../../../controller/user/admin.controller"));
const admin_request_1 = __importDefault(require("../../../requests/user/admin.request"));
const Authorization_middleware_1 = require("../../../middleware/Authorization.middleware");
const router = (0, express_1.Router)();
const controller = new admin_controller_1.default();
const requests = new admin_request_1.default();
router.post("/login", (0, Query_middleware_1.default)(requests.login), controller.login);
router.post("/add/newadmin", (0, Query_middleware_1.default)(requests.add), controller.create);
router.put("/me/change/pass", Authorization_middleware_1.selfData, (0, Query_middleware_1.default)(requests.changePass), controller.changePass);
router.post("/all", controller.getAdminInfo);
router.get("/getinfo/:id", controller.getAdminInfo);
exports.default = router;
