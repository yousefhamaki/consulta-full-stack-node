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
const menuForkForks_model_1 = __importDefault(require("../../app/models/menu/menuForkForks.model"));
const menuForks_model_1 = __importDefault(require("../../app/models/menu/menuForks.model"));
const menu = new menuForks_model_1.default();
const main = new menu_model_1.default();
const option = new menuForkForks_model_1.default();
const mainAction = new main_models_1.default();
const optionData = {
    name: "option",
    status: 1,
    content: "asfcsad",
    file: "vdsvsd",
    order: 0,
};
const menuData = {
    name: "test item",
    content: "",
    logo: null,
    status: 1,
};
const menuMainData = {
    name: "test item",
    status: 1,
};
const update_info = {
    name: "test update",
    content: "fdfqw",
    file: "afadfd",
    order: 1,
    status: 0,
};
describe("Menu fork options Model", () => {
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield main.create(menuMainData);
        menuData.menu_id = res === null || res === void 0 ? void 0 : res.insertId;
        const res2 = yield menu.create(menuData);
        menuData.id = res2 === null || res2 === void 0 ? void 0 : res2.insertId;
        update_info.fork_id = res2 === null || res2 === void 0 ? void 0 : res2.insertId;
        optionData.fork_id = res2 === null || res2 === void 0 ? void 0 : res2.insertId;
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield mainAction.delete(menuData.id, "menu_forks");
        yield mainAction.delete(menuData.menu_id, "menu");
    }));
    it("created new item in menu forks", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield option.create(optionData);
        optionData.id = res === null || res === void 0 ? void 0 : res.insertId;
        update_info.id = res === null || res === void 0 ? void 0 : res.insertId;
        expect(res === null || res === void 0 ? void 0 : res.insertId).toBeDefined;
    }));
    it("returns menu fork options item info", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = (yield option.getMenuItem(optionData.id));
        expect(Number(res.id)).toEqual(optionData.id);
    }));
    it("returns menu fork options items info", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = (yield option.getMenuItems());
        expect(Number(res.length)).toBeGreaterThan(0);
    }));
    it("returns valied menu fork options items info", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = (yield option.getValiedMenuItems(1));
        expect(Number(res.pagination.current)).toEqual(1);
        expect(Number(res.data.length)).toBeLessThan(16);
    }));
    it("update menu fork options item info", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = (yield option.updateInfo(update_info));
        expect(res.changedRows).toEqual(1);
        expect(res.affectedRows).toEqual(1);
    }));
    it("update menu fork options item status", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = (yield mainAction.updateStatus(0, optionData.id, "menu_fork_options"));
        expect(res.changedRows).toEqual(0);
        expect(res.affectedRows).toEqual(1);
    }));
    it("Delete menu fork options item from DB", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield mainAction.delete(optionData.id, "menu_fork_options");
        expect(res.affectedRows).toEqual(1);
    }));
    it("Error Delete menu fork options item from DB", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield mainAction.delete(9999, "menu_fork_options");
        expect(res.affectedRows).toEqual(0);
    }));
});
