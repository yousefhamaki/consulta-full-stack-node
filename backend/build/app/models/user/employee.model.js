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
const HashPass_1 = __importDefault(require("../../traits/HashPass"));
const config_1 = __importDefault(require("../../config"));
class employeeModel {
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const rows = (yield (0, connect_1.query)(`INSERT INTO employees (admin_id, name, email, options, password,
             salary, job_title, status, created_at, updated_at)
                VALUES ('${data.admin_id}', '${data.name}', '${data.email}', '${data.options}', '${HashPass_1.default.MakeHash(data.password)}', '${data.salary}', '${data.job_title}', '${data.status}', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);`));
                const user = (yield this.getEmployee(rows.insertId));
                return user;
            }
            catch (err) {
                throw new Error(`unable to add this employees : ${err.message}`);
            }
        });
    }
    makeAuth(email, pass) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const rows = (yield (0, connect_1.query)(`SELECT password FROM employees WHERE email='${email}';`));
                if (rows.length > 0) {
                    const { password: hash } = rows[0];
                    if (HashPass_1.default.check(pass, hash)) {
                        const q = `SELECT id, name, email FROM employees WHERE email='${email}';`;
                        const result = (yield (0, connect_1.query)(q));
                        return result[0];
                    }
                }
                return null;
            }
            catch (err) {
                throw new Error(`unable to login ${email} : ${err.message}`);
            }
        });
    }
    getEmployee(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const rows = (yield (0, connect_1.query)(`SELECT id, name, email, img FROM employees WHERE id='${id}'`));
                return rows[0];
            }
            catch (err) {
                throw new Error(`unable to get this admin : ${err.message}`);
            }
        });
    }
    getEmployees(page) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const rows = (yield (0, connect_1.query)(`SELECT count(*) as numRows FROM employees`));
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
                const users = (yield (0, connect_1.query)(`SELECT * FROM employees ORDER BY ID DESC LIMIT ${skip}, ${config_1.default.perPage}`));
                return {
                    pagination: {
                        current: page,
                        perPage: config_1.default.perPage,
                        totalPages: pages,
                        previous: page > 0 ? page - 1 : undefined,
                        next: page < pages - 1 ? page + 1 : undefined,
                    },
                    data: users,
                    type: "success",
                };
            }
            catch (err) {
                throw new Error(`unable to get employees : ${err.message}`);
            }
        });
    }
    changePass(oldpassword, newpassword, id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const password = (yield (0, connect_1.query)(`SELECT password FROM employees WHERE id='${id}';`));
                if (password.length > 0) {
                    const { password: hash } = password[0];
                    if (HashPass_1.default.check(oldpassword, hash)) {
                        const rows = (yield (0, connect_1.query)(`UPDATE  employees SET password='${HashPass_1.default.MakeHash(newpassword)}', updated_at=CURRENT_TIMESTAMP WHERE id='${id}'`));
                        return rows;
                    }
                }
                return null;
            }
            catch (err) {
                throw new Error(`unable to change password of this employees : ${err.message}`);
            }
        });
    }
}
exports.default = employeeModel;
