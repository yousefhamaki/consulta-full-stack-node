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
const partitions_model_1 = __importDefault(require("../../app/models/menu/partitions.model"));
const partition = new partitions_model_1.default();
const data = {
    name: "test partition",
    img: "faiafc.img",
    link: null,
    status: 1,
    relations: [{ id: 1 }, { id: 2 }, { id: 3 }],
};
describe("Partitions Model", () => {
    it("created new item in partition", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield partition.create(data);
        data.id = res === null || res === void 0 ? void 0 : res.insertId;
        expect(res === null || res === void 0 ? void 0 : res.affectedRows).toBe(data.relations.length);
    }));
    it("get all partitions to admin", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield partition.getAll("admin");
        expect(res.length).toBeGreaterThan(0);
    }));
    it("get all partitions to user", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield partition.getAll("user");
        expect(res.length).toBeGreaterThan(0);
    }));
    it("get partition by id", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield partition.getPartition(data.id);
        expect(res.id).toBe(data.id);
        expect(res.relations.length).toEqual(data.relations.length);
    }));
    it("delete partition by id", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield partition.delete(data.id);
        expect(res.affectedRows).toBe(4);
    }));
});
