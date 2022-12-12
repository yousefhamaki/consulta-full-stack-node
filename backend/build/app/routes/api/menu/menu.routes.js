"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const menu_controller_1 = __importDefault(require("../../../controller/menu/menu.controller"));
const router = (0, express_1.Router)();
const controller = new menu_controller_1.default();
router.get("/", controller.getMenu);
exports.default = router;
