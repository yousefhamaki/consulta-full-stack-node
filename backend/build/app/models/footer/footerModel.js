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
class FooterModel {
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const rows = (yield (0, connect_1.query)(`INSERT INTO footer (name, status)
                    VALUES ('${data.name}', ${data.status});`));
                return rows;
            }
            catch (err) {
                throw new Error(`unable to add this item : ${err.message}`);
            }
        });
    }
    getFooterItems() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const menu = (yield (0, connect_1.query)(`SELECT id, name, status FROM footer`));
                return menu;
            }
            catch (err) {
                throw new Error(`unable to get footer items : ${err.message}`);
            }
        });
    }
    getFooterItem(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const rows = (yield (0, connect_1.query)(`SELECT * FROM footer WHERE id='${id}'`));
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
                const rows = (yield (0, connect_1.query)(`UPDATE  footer SET name='${data.name}', status='${data.status}',
         updated_at=CURRENT_TIMESTAMP WHERE id='${data.id}'`));
                return rows;
            }
            catch (err) {
                throw new Error(`unable to change info of this item : ${err.message}`);
            }
        });
    }
    getFooterUser() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const rows = (yield (0, connect_1.query)(`SELECT footer_fork.id, footer_fork.name, footer.name as footer_name,
         footer_fork.footer_id as footer_id
            FROM footer_fork
            INNER JOIN footer ON footer.status=1 AND footer.id=footer_fork.footer_id
            WHERE 
            footer_fork.status=1;`));
                return this.designinFooter(rows);
            }
            catch (err) {
                throw new Error(`unable to get Footer items : ${err.message}`);
            }
        });
    }
    designinFooter(footer) {
        const unique = [...new Set(footer.map((item) => item.footer_id))];
        const result = [];
        for (let index = 0; index < unique.length; index++) {
            const x = footer.filter((item) => {
                return item.footer_id === unique[index];
            });
            result.push({
                id: unique[index],
                name: x[0].footer_name,
                data: this.removeMain(x),
            });
        }
        return result;
    }
    removeMain(menu) {
        const result = [];
        for (let index = 0; index < menu.length; index++) {
            result.push({
                id: menu[index].id,
                name: menu[index].name,
            });
        }
        return result;
    }
}
exports.default = FooterModel;
