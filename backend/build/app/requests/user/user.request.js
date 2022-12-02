"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class userRequest {
    constructor() {
        this.login = {
            email: "required",
            password: "required",
        };
        this.changePass = {
            id: "required|number",
            oldpassword: "required",
            newpassword: "required",
        };
        this.verify = {
            email: "required|string",
            code: "required|string",
        };
        this.add = {
            email: "required",
            password: "required",
            name: "required",
            age: "required",
            ip: "required",
        };
    }
}
exports.default = userRequest;
