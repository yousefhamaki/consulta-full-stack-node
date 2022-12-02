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
const connect_1 = require("../../database/connect");
const config_1 = __importDefault(require("../../config"));
class MenuForkOptionModel {
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const rows = (yield (0, connect_1.query)(`INSERT INTO menu_fork_options (fork_id, name, file, content, \`order\`, status)
            VALUES (${data.fork_id}, '${data.name}', '${data.file}', '${data.content}',
             '${data.order}',${data.status});`));
                return rows;
            }
            catch (err) {
                throw new Error(`unable to add this option : ${err.message}`);
            }
        });
    }
    getMenuItems() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const menu = (yield (0, connect_1.query)(`SELECT id, name FROM menu_fork_options`));
                return menu;
            }
            catch (err) {
                throw new Error(`unable to get this items : ${err.message}`);
            }
        });
    }
    getValiedMenuItems(page) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const rows = (yield (0, connect_1.query)(`SELECT count(*) as numRows FROM menu_fork_options WHERE status=1`));
                const skip = (page - 1) * config_1.default.perPage;
                const pages = Math.ceil(rows[0].numRows / config_1.default.perPage);
                if (page - 1 > pages) {
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
                const menu = (yield (0, connect_1.query)(`SELECT id, name FROM menu_fork_options WHERE status=1 ORDER BY name ASC LIMIT ${skip}, ${config_1.default.perPage}`));
                return {
                    pagination: {
                        current: page,
                        perPage: config_1.default.perPage,
                        totalPages: pages,
                        previous: page > 1 ? page - 1 : undefined,
                        next: page < pages - 1 ? page + 1 : undefined,
                    },
                    data: menu,
                    type: "success",
                };
            }
            catch (err) {
                throw new Error(`unable to get this items : ${err.message}`);
            }
        });
    }
    getMenuItem(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const rows = (yield (0, connect_1.query)(`SELECT * FROM menu_fork_options WHERE id='${id}'`));
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
                const rows = (yield (0, connect_1.query)(`UPDATE  menu_fork_options SET fork_id='${data.fork_id}', name='${data.name}',
        content='${data.content}', file='${data.file}', \`order\`=${data.order},
         status='${data.status}',
         updated_at=CURRENT_TIMESTAMP
         WHERE id='${data.id}'`));
                return rows;
            }
            catch (err) {
                throw new Error(`unable to change info of this item : ${err.message}`);
            }
        });
    }
}
exports.default = MenuForkOptionModel;
