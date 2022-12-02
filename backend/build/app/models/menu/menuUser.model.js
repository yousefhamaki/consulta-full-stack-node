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
class menuUserModel {
    getMenu() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const menu = (yield (0, connect_1.query)(`SELECT menu_forks.id, menu_forks.name, menu_forks.logo as logo, menu.name as menu_name, menu.id as menu_id
        FROM menu_forks
        INNER JOIN menu ON menu.status=1 AND menu.id=menu_forks.menu_id
        WHERE 
        menu_forks.status=1;`));
                return this.designingMenu(menu);
            }
            catch (err) {
                throw new Error(`unable to get this items : ${err.message}`);
            }
        });
    }
    designingMenu(menu) {
        const unique = [...new Set(menu.map((item) => item.menu_id))];
        const result = [];
        for (let index = 0; index < unique.length; index++) {
            const x = menu.filter((item) => {
                return item.menu_id === unique[index];
            });
            result.push({
                id: unique[index],
                name: x[0].menu_name,
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
                logo: menu[index].logo,
            });
        }
        return result;
    }
}
exports.default = menuUserModel;
