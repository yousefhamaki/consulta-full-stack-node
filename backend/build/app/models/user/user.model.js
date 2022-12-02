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
class userModel {
    makeAuth(email, pass) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const rows = (yield (0, connect_1.query)(`SELECT id, password FROM users WHERE email='${email}';`));
                if (rows.length > 0) {
                    const { password: hash } = rows[0];
                    if (HashPass_1.default.check(pass, hash)) {
                        const user = (yield this.getUser(rows[0].id));
                        return user;
                    }
                }
                return null;
            }
            catch (err) {
                throw new Error(`unable to login ${email} : ${err.message}`);
            }
        });
    }
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const rows = (yield (0, connect_1.query)(`INSERT INTO users (ip, name, email, password, age, created_at, updated_at)
        VALUES ('${data.ip}', '${data.name}', '${data.email}', '${HashPass_1.default.MakeHash(data.password)}', '${data.age}', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);`));
                const user = (yield this.getUser(rows.insertId));
                return user;
            }
            catch (err) {
                throw new Error(`unable to add this user : ${err.message}`);
            }
        });
    }
    checkEmail(email, table) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const rows = (yield (0, connect_1.query)(`SELECT email FROM ${table} WHERE email='${email}'`));
                if (rows.length > 0) {
                    return true;
                }
                return false;
            }
            catch (err) {
                throw new Error(`unable to get this user : ${err.message}`);
            }
        });
    }
    getUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const rows = (yield (0, connect_1.query)(`SELECT id, name, email, email_verified_at, profile_photo_path, age FROM users WHERE id='${id}'`));
                return rows[0];
            }
            catch (err) {
                throw new Error(`unable to get this user : ${err.message}`);
            }
        });
    }
    saveCode(code, email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const rows = (yield (0, connect_1.query)(`UPDATE users SET code='${code}', updated_at=CURRENT_TIMESTAMP WHERE email='${email}';`));
                return rows;
            }
            catch (err) {
                throw new Error(`unable to save this code : ${err.message}`);
            }
        });
    }
    checkCode(usercode, email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const rows = (yield (0, connect_1.query)(`SELECT code FROM users WHERE email='${email}';`));
                if (rows.length > 0) {
                    if (rows[0].code === usercode) {
                        return true;
                    }
                }
                return false;
            }
            catch (err) {
                throw new Error(`your code isnot vailed : ${err.message}`);
            }
        });
    }
    Verify(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const rows = (yield (0, connect_1.query)(`UPDATE users SET email_verified_at=CURRENT_TIMESTAMP, updated_at=CURRENT_TIMESTAMP WHERE email='${email}';`));
                return rows;
            }
            catch (err) {
                throw new Error(`unable to save this code : ${err.message}`);
            }
        });
    }
    changePass(oldpassword, newpassword, id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const password = (yield (0, connect_1.query)(`SELECT password FROM users WHERE id='${id}';`));
                if (password.length > 0) {
                    const { password: hash } = password[0];
                    if (HashPass_1.default.check(oldpassword, hash)) {
                        const rows = (yield (0, connect_1.query)(`UPDATE  users SET password='${HashPass_1.default.MakeHash(newpassword)}', updated_at=CURRENT_TIMESTAMP WHERE id='${id}'`));
                        return rows;
                    }
                }
                return null;
            }
            catch (err) {
                throw new Error(`unable to change password of this user : ${err.message}`);
            }
        });
    }
    getAllUsers(page) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const rows = (yield (0, connect_1.query)(`SELECT count(*) as numRows FROM users`));
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
                const users = (yield (0, connect_1.query)(`SELECT * FROM users ORDER BY ID ASC LIMIT ${skip}, ${config_1.default.perPage}`));
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
                throw new Error(`unable to get users : ${err.message}`);
            }
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const rows = (yield (0, connect_1.query)(`DELETE FROM users WHERE id='${id}';`));
                return rows;
            }
            catch (err) {
                throw new Error(`unable to delete this user : ${err.message}`);
            }
        });
    }
}
exports.default = userModel;
