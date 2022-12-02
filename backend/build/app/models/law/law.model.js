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
const config_1 = __importDefault(require("../../config"));
const connect_1 = require("../../database/connect");
class lawModel {
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const rows = (yield (0, connect_1.query)(`INSERT INTO law (law_name, file, content)
             VALUES ('${data.law_name}', '${data.file}', '${data.content}');`));
                return rows;
            }
            catch (err) {
                throw new Error(`unable to add this item : ${err.message}`);
            }
        });
    }
    updateInfo(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const rows = (yield (0, connect_1.query)(`UPDATE  law SET law_name='${data.law_name}', file='${data.file}',
        content='${data.content}',
         updated_at=CURRENT_TIMESTAMP WHERE id='${data.id}'`));
                return rows;
            }
            catch (err) {
                throw new Error(`unable to change info of this law : ${err.message}`);
            }
        });
    }
    getAllLaw(page) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const rows = (yield (0, connect_1.query)(`SELECT count(*) as numRows FROM law`));
                const skip = page * config_1.default.perPage;
                const pages = Math.ceil(rows[0].numRows / config_1.default.perPage);
                if (page > pages) {
                    return {
                        pagination: {
                            current: page,
                            perPage: config_1.default.perPage,
                            totalPages: pages,
                            previous: page > 0 ? page - 1 : undefined,
                            next: page < pages - 1 ? page + 1 : undefined,
                        },
                        data: [null],
                        type: "error",
                    };
                }
                const users = (yield (0, connect_1.query)(`SELECT id, law_name, file FROM law ORDER BY law_name ASC LIMIT ${skip}, ${config_1.default.perPage}`));
                return {
                    pagination: {
                        current: page,
                        perPage: config_1.default.perPage,
                        totalPages: pages,
                        previous: page > 1 ? page - 1 : undefined,
                        next: page < pages - 1 ? page + 1 : undefined,
                    },
                    data: users,
                    type: "success",
                };
            }
            catch (err) {
                throw new Error(`unable to get Law items : ${err.message}`);
            }
        });
    }
    getLawItem(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const law = (yield (0, connect_1.query)(`SELECT * FROM law WHERE id='${id}'`));
                return law[0];
            }
            catch (err) {
                throw new Error(`unable to get law item : ${err.message}`);
            }
        });
    }
}
exports.default = lawModel;
