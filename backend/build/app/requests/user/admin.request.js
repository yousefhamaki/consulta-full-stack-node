"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class adminRequest {
    constructor() {
        this.add = {
            email: "required",
            password: "required",
            name: "required",
        };
        this.login = {
            email: "required",
            password: "required",
        };
        this.changePass = {
            id: "required|number",
            oldpassword: "required",
            newpassword: "required",
        };
    }
}
exports.default = adminRequest;
