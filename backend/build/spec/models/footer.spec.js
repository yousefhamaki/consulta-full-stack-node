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
const footerForkModel_1 = __importDefault(require("../../app/models/footer/footerForkModel"));
const footerModel_1 = __importDefault(require("../../app/models/footer/footerModel"));
const main_models_1 = __importDefault(require("../../app/models/main.models"));
const footer = new footerModel_1.default();
const mainAction = new main_models_1.default();
const footerData = {
    name: "test item",
    status: 1,
};
const update_info = {
    name: "test update",
    status: 0,
};
describe("footer Model", () => {
    it("created new item in footer", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield footer.create(footerData);
        footerData.id = res === null || res === void 0 ? void 0 : res.insertId;
        update_info.id = res === null || res === void 0 ? void 0 : res.insertId;
        expect(res === null || res === void 0 ? void 0 : res.insertId).toBeDefined;
    }));
    it("returns footer item info", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = (yield footer.getFooterItem(footerData.id));
        expect(Number(res.id)).toEqual(footerData.id);
    }));
    it("returns footer item info", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = (yield footer.getFooterItems());
        expect(Number(res.length)).toBeGreaterThan(0);
    }));
    it("returns footer item info for user", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = (yield footer.getFooterUser());
        expect(Number(res.length)).toBeGreaterThan(0);
    }));
    it("update footer item info", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = (yield footer.updateInfo(update_info));
        expect(res.changedRows).toEqual(1);
        expect(res.affectedRows).toEqual(1);
    }));
    it("update footer item status", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = (yield mainAction.updateStatus(0, footerData.id, "footer"));
        expect(res.changedRows).toEqual(0);
        expect(res.affectedRows).toEqual(1);
    }));
    it("Delete footer from DB", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield mainAction.delete(footerData.id, "footer");
        expect(res.affectedRows).toEqual(1);
    }));
    it("Delete footer from DB", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield mainAction.delete(9999, "footer");
        expect(res.affectedRows).toEqual(0);
    }));
});
const fork = new footerForkModel_1.default();
const footerForkData = {
    name: "test item",
    status: 1,
};
const updateFork_info = {
    name: "test update",
    status: 0,
};
describe("footer fork Model", () => {
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield footer.create(footerData);
        footerForkData.footer_id = res.insertId;
        updateFork_info.footer_id = res.insertId;
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield mainAction.delete(footerForkData.footer_id, "footer");
    }));
    it("created new item in footer fork", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield fork.create(footerForkData);
        footerForkData.id = res === null || res === void 0 ? void 0 : res.insertId;
        updateFork_info.id = res === null || res === void 0 ? void 0 : res.insertId;
        expect(res === null || res === void 0 ? void 0 : res.insertId).toBeDefined;
    }));
    it("returns footer fork item info", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = (yield fork.getForkItem(footerForkData.id));
        expect(Number(res.id)).toEqual(footerForkData.id);
    }));
    it("returns footer fork item info", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = (yield fork.getForkItems());
        expect(Number(res.length)).toBeGreaterThan(0);
    }));
    it("update footer fork item info", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = (yield fork.updateInfo(updateFork_info));
        expect(res.changedRows).toEqual(1);
        expect(res.affectedRows).toEqual(1);
    }));
    it("update footer fork item status", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = (yield mainAction.updateStatus(0, footerForkData.id, "footer_fork"));
        expect(res.changedRows).toEqual(0);
        expect(res.affectedRows).toEqual(1);
    }));
    it("Delete footer fork from DB", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield mainAction.delete(footerForkData.id, "footer_fork");
        expect(res.affectedRows).toEqual(1);
    }));
    it("Delete footer fork from DB", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield mainAction.delete(9999, "footer_fork");
        expect(res.affectedRows).toEqual(0);
    }));
});
