"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const menu_model_1 = __importDefault(require("../../models/menu/menu.model"));
const menuUser_model_1 = __importDefault(require("../../models/menu/menuUser.model"));
const model = new menu_model_1.default();
const menuUser = new menuUser_model_1.default();
class menuController {
    create(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield model.create(req.body);
                return res.json({
                    status: "success",
                    message: "Menu item created successfully",
                    data: result,
                });
            }
            catch (err) {
                next(err);
            }
        });
    }
    getMenu(_req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield menuUser.getMenu();
                return res.json({
                    status: "success",
                    message: "Getting Menu successfully",
                    data: result,
                });
            }
            catch (err) {
                next(err);
            }
        });
    }
    getMenuItems(_req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield model.getMenuItems();
                return res.json({
                    status: "success",
                    message: "Get menu items successfully",
                    data: result,
                });
            }
            catch (err) {
                next(err);
            }
        });
    }
    getMenuItem(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield model.getMenuItem(Number(req.params.id));
                return res.json({
                    status: "success",
                    message: "Get menu item successfully",
                    data: result,
                });
            }
            catch (err) {
                next(err);
            }
        });
    }
    updateInfo(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield model.updateInfo(req.body);
                return res.json({
                    status: "success",
                    message: "Menu item updated successfully",
                    data: result,
                });
            }
            catch (err) {
                next(err);
            }
        });
    }
}
exports.default = menuController;
