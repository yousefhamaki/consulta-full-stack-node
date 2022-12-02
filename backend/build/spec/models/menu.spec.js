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
const main_models_1 = __importDefault(require("../../app/models/main.models"));
const menu_model_1 = __importDefault(require("../../app/models/menu/menu.model"));
const menu = new menu_model_1.default();
const mainAction = new main_models_1.default();
const menuData = {
    name: "test item",
    status: 1,
};
const update_info = {
    name: "test update",
    status: 0,
};
describe("Menu Model", () => {
    it("created new item in menu", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield menu.create(menuData);
        menuData.id = res === null || res === void 0 ? void 0 : res.insertId;
        update_info.id = res === null || res === void 0 ? void 0 : res.insertId;
        expect(res === null || res === void 0 ? void 0 : res.insertId).toBeDefined;
    }));
    it("returns menu item info", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = (yield menu.getMenuItem(menuData.id));
        expect(Number(res.id)).toEqual(menuData.id);
    }));
    it("returns menu item info", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = (yield menu.getMenuItems());
        expect(Number(res.length)).toBeGreaterThan(0);
    }));
    it("update menu item info", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = (yield menu.updateInfo(update_info));
        expect(res.changedRows).toEqual(1);
        expect(res.affectedRows).toEqual(1);
    }));
    it("update menu item status", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = (yield mainAction.updateStatus(0, menuData.id, "menu"));
        expect(res.changedRows).toEqual(0);
        expect(res.affectedRows).toEqual(1);
    }));
    it("Delete user from DB", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield mainAction.delete(menuData.id, "menu");
        expect(res.affectedRows).toEqual(1);
    }));
    it("Delete user from DB", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield mainAction.delete(9999, "menu");
        expect(res.affectedRows).toEqual(0);
    }));
});
