"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const { PORT, REQUEST_LIMIT, TIME_LIMIT, MESSAGE_LIMIT, ACTIVE_HOME, DB_HOST, DB_PORT, DB_DATABASE_DEV, DB_DATABASE_TEST, DB_USERNAME, DB_PASSWORD, PCRYPT_ROUNDS, PCRYPT_PASS, SECRET_TOKEN, GMAIL_ACC, GMAIL_PASS, DOMAIN_NAME, PERPAGE, } = process.env;
exports.default = {
    port: PORT,
    TimeLimit: Number(TIME_LIMIT),
    RequestLimit: Number(REQUEST_LIMIT),
    MessageLimit: MESSAGE_LIMIT,
    ActiveHome: ACTIVE_HOME,
    DB_HOST,
    DB_PORT,
    DB_DATABASE: process.env.NODE_ENV === "dev" ? DB_DATABASE_DEV : DB_DATABASE_TEST,
    DB_USERNAME,
    DB_PASSWORD,
    pacryptRounds: PCRYPT_ROUNDS,
    pcryptPass: PCRYPT_PASS,
    secretToken: SECRET_TOKEN,
    EmailGmail: GMAIL_ACC,
    GmailPassword: GMAIL_PASS,
    DomainName: DOMAIN_NAME,
    perPage: Number(PERPAGE),
};
