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
Object.defineProperty(exports, "__esModule", { value: true });
const connect_1 = require("../database/connect");
class MainModel {
    delete(id, tableName) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const rows = (yield (0, connect_1.query)(`DELETE FROM ${tableName} WHERE id='${id}';`));
                return rows;
            }
            catch (err) {
                throw new Error(`unable to delete this id : ${err.message}`);
            }
        });
    }
    updateStatus(status, id, tableName) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const rows = (yield (0, connect_1.query)(`UPDATE  ${tableName} SET status='${status}',
             updated_at=CURRENT_TIMESTAMP WHERE id='${id}'`));
                return rows;
            }
            catch (err) {
                throw new Error(`unable to change status of this item : ${err.message}`);
            }
        });
    }
}
exports.default = MainModel;
