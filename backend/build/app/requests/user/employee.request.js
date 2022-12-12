"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class employeeRequest {
    constructor() {
        this.add = {
            email: "required",
            password: "required",
            name: "required",
            options: "required",
            salary: "required|number",
            job_title: "required",
            status: "reuired",
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
exports.default = employeeRequest;
