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
const connect_1 = require("../../database/connect");
class FooterForkModel {
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const rows = (yield (0, connect_1.query)(`INSERT INTO footer_fork (name, footer_id, content, status)
         VALUES ('${data.name}', '${data.footer_id}', '${data.content}', ${data.status});`));
                return rows;
            }
            catch (err) {
                throw new Error(`unable to add this item : ${err.message}`);
            }
        });
    }
    getForkItems() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const menu = (yield (0, connect_1.query)(`SELECT id, name, status FROM footer_fork`));
                return menu;
            }
            catch (err) {
                throw new Error(`unable to get footer items : ${err.message}`);
            }
        });
    }
    getForkItem(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const rows = (yield (0, connect_1.query)(`SELECT * FROM footer_fork WHERE id='${id}'`));
                return rows[0];
            }
            catch (err) {
                throw new Error(`unable to get this item : ${err.message}`);
            }
        });
    }
    updateInfo(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const rows = (yield (0, connect_1.query)(`UPDATE  footer_fork SET name='${data.name}', footer_id='${data.footer_id}',
            content='${data.content}', status='${data.status}',
           updated_at=CURRENT_TIMESTAMP WHERE id='${data.id}'`));
                return rows;
            }
            catch (err) {
                throw new Error(`unable to change info of this item : ${err.message}`);
            }
        });
    }
}
exports.default = FooterForkModel;
