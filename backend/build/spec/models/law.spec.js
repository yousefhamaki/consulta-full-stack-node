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
const config_1 = __importDefault(require("../../app/config"));
const law_model_1 = __importDefault(require("../../app/models/law/law.model"));
const main_models_1 = __importDefault(require("../../app/models/main.models"));
const law = new law_model_1.default();
const mainAction = new main_models_1.default();
const data = {
    law_name: "test law name",
    content: "test law content",
    file: "null",
};
const updateInfo = {
    law_name: "test law name update",
    content: "test law content update",
    file: "null",
};
describe("Testing Law Model", () => {
    it("expect New law created", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield law.create(data);
        data.id = res.insertId;
        updateInfo.id = res.insertId;
        expect(res.insertId).toBeDefined;
    }));
    it("expect get law info", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield law.getLawItem(data.id);
        expect(res.id).toEqual(data.id);
    }));
    it("update law item info", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = (yield law.updateInfo(updateInfo));
        expect(res.changedRows).toEqual(1);
        expect(res.affectedRows).toEqual(1);
    }));
    it("expect get laws info in paginate", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield law.getAllLaw(1);
        expect(res.pagination.current).toEqual(1);
        expect(res.pagination.perPage).toEqual(config_1.default.perPage);
        expect(res.data.length).toBeGreaterThan(0);
    }));
    it("expect get laws info in paginate", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield law.getAllLaw(2);
        expect(res.pagination.current).toEqual(2);
        expect(res.pagination.perPage).toEqual(config_1.default.perPage);
        expect(res.data.length).toBeGreaterThan(0);
    }));
    it("Delete law from DB", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield mainAction.delete(data.id, "law");
        expect(res.affectedRows).toEqual(1);
    }));
});
