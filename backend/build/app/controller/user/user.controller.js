"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const user_model_1 = __importDefault(require("../../models/user/user.model"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../../config"));
const Gmail_1 = __importDefault(require("../../mail/Gmail"));
const main_models_1 = __importDefault(require("../../models/main.models"));
const valiedPassword_1 = __importStar(require("../../traits/valiedPassword"));
const models = new user_model_1.default();
const mainModel = new main_models_1.default();
class userController {
    create(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const checkPass = yield (0, valiedPassword_1.default)(req.body.password);
            if (checkPass !== false) {
                return res.status(505).json(checkPass);
            }
            try {
                const checkemail = yield (0, valiedPassword_1.valiedEmail)(req.body.email, "users");
                if (checkemail !== false) {
                    return res.status(505).json(checkemail);
                }
                const create = yield models.create(req.body);
                const token = jsonwebtoken_1.default.sign({ create }, config_1.default.secretToken);
                return res.json({
                    status: "success",
                    message: "User created successfully",
                    data: Object.assign(Object.assign({}, create), { token: "Bearer " + token }),
                });
            }
            catch (err) {
                next(err);
            }
        });
    }
    login(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield models.makeAuth(req.body.email, req.body.password);
                if (!data) {
                    return res.status(401).json({
                        status: "failed",
                        message: "email or password is not correct",
                    });
                }
                const token = jsonwebtoken_1.default.sign({ data }, config_1.default.secretToken);
                return res.status(200).json({
                    status: "success",
                    message: "user is login successfully",
                    data: Object.assign(Object.assign({}, data), { token: "Bearer " + token }),
                });
            }
            catch (err) {
                next(err);
            }
        });
    }
    getUserInfo(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield models.getUser(Number(req.params.id));
                if (!user) {
                    return res.status(404).json({
                        status: "failed",
                        message: "this user isnot defined",
                    });
                }
                return res.status(200).json({
                    status: "success",
                    message: "Get User info successfully",
                    data: user,
                });
            }
            catch (err) {
                next(err);
            }
        });
    }
    getUsers(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield models.getAllUsers(Number(req.query.page) | 1);
                return res.status(200).json({
                    status: "success",
                    message: "Users info got successfully",
                    data: user,
                });
            }
            catch (err) {
                next(err);
            }
        });
    }
    delete(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const state = yield mainModel.delete(Number(req.params.id), "users");
                if (state.affectedRows === 1) {
                    return res.json({
                        status: "success",
                        message: "User deleted successfully",
                        data: state,
                    });
                }
                return res.status(500).json({
                    status: "failed",
                    message: "This user isnot defined",
                    data: state,
                });
            }
            catch (err) {
                next(err);
            }
        });
    }
    verifyRequest(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const token = jsonwebtoken_1.default.sign({ email: req.body.email, id: 22 }, config_1.default.secretToken, {
                    expiresIn: "5m",
                });
                yield models.saveCode(token, req.body.email);
                const mailDetails = {
                    to: req.body.email,
                    subject: "Verify Account",
                    html: `<div>
        <h2>Verify your consulta account</h2>
        <a href="${config_1.default.DomainName +
                        "/api/verify/verify." +
                        token +
                        "/" +
                        req.body.email}">
          <button>verify</button>
        </a>
      </div>`,
                };
                yield Gmail_1.default.sendMail(mailDetails, function (error, info) {
                    if (error) {
                        next(error);
                    }
                    else {
                        return res.json({
                            status: "success",
                            message: "Check your G-mail acoount",
                            data: info,
                        });
                    }
                });
            }
            catch (err) {
                next(err);
            }
        });
    }
    verifyResponse(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (yield models.checkCode(req.params.code, req.params.email)) {
                    yield models.Verify(req.params.email);
                    return res.json({
                        status: "success",
                        message: "User account is verified successfully",
                    });
                }
                return res.status(401).json({
                    status: "failed",
                    message: "User link was ended, please request a new link",
                });
            }
            catch (err) {
                next(err);
            }
        });
    }
    changePass(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield models.changePass(req.body.oldpassword, req.body.newpassword, Number(req.body.id));
                if (result === null) {
                    return res.status(412).json({
                        status: "failed",
                        message: "your password isnot correct",
                    });
                }
                return res.json({
                    status: "success",
                    message: "User account is verified successfully",
                    data: result,
                });
            }
            catch (err) {
                next(err);
            }
        });
    }
}
exports.default = userController;
